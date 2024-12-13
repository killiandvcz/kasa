export class FakeDB {
    constructor(data) {
        this.data = data;
        this._validateData();
    }

    // Validation des données à l'initialisation
    _validateData() {
        if (!Array.isArray(this.data)) {
            throw new Error('FakeDB: Data must be an array');
        }

        if (!this.data.every(item => item.id)) {
            throw new Error('FakeDB: Each item must have an id property');
        }
    }

    // Simuler un délai réseau
    async _fakeDelay(min = 100, max = 300) {
        const delay = Math.floor(Math.random() * (max - min + 1) + min);
        await new Promise(resolve => setTimeout(resolve, delay));
    }

    // Méthodes CRUD de base
    async findAll() {
        await this._fakeDelay();
        return [...this.data];
    }

    async findById(id) {
        await this._fakeDelay();
        const item = this.data.find(item => item.id === id);
        if (!item) throw new Error(`Item with id ${id} not found`);
        return {...item};
    }

    // Méthodes de recherche avancées
    async findByField(field, value) {
        await this._fakeDelay();
        return this.data.filter(item => item[field] === value).map(item => ({...item}));
    }

    async search(query) {
        await this._fakeDelay();
        const searchableFields = ['title', 'description', 'location'];
        const lowercaseQuery = query.toLowerCase();

        return this.data.filter(item =>
            searchableFields.some(field =>
                item[field]?.toLowerCase().includes(lowercaseQuery)
            )
        ).map(item => ({...item}));
    }

    // Pagination
    async paginate(page = 1, limit = 10) {
        await this._fakeDelay();
        const start = (page - 1) * limit;
        const end = start + limit;

        return {
            data: this.data.slice(start, end).map(item => ({...item})),
            pagination: {
                total: this.data.length,
                page,
                limit,
                totalPages: Math.ceil(this.data.length / limit),
                hasNext: end < this.data.length,
                hasPrev: page > 1
            }
        };
    }

    // Filtrage avancé
    async filter(criteria) {
        await this._fakeDelay();
        return this.data.filter(item => {
            return Object.entries(criteria).every(([key, value]) => {
                // Gestion des tableaux (comme tags, equipments)
                if (Array.isArray(item[key])) {
                    return Array.isArray(value)
                        ? value.every(v => item[key].includes(v))  // Tous les critères doivent matcher
                        : item[key].includes(value);               // Un seul critère doit matcher
                }
                // Gestion des objets imbriqués
                if (typeof item[key] === 'object' && item[key] !== null) {
                    return Object.entries(value).every(([k, v]) => item[key][k] === v);
                }
                // Comparaison simple
                return item[key] === value;
            });
        }).map(item => ({...item}));
    }

    // Agrégation et statistiques
    async aggregate(field) {
        await this._fakeDelay();
        const result = this.data.reduce((acc, item) => {
            const value = item[field];
            if (Array.isArray(value)) {
                value.forEach(v => {
                    acc[v] = (acc[v] || 0) + 1;
                });
            } else {
                acc[value] = (acc[value] || 0) + 1;
            }
            return acc;
        }, {});

        return Object.entries(result).map(([key, count]) => ({
            [field]: key,
            count
        }));
    }

    // Relations
    async findRelated(id, field) {
        await this._fakeDelay();
        const item = await this.findById(id);
        if (!item[field]) throw new Error(`Field ${field} not found`);

        if (Array.isArray(item[field])) {
            return this.data.filter(other =>
                other.id !== id &&
                other[field]?.some(value => item[field].includes(value))
            ).map(item => ({...item}));
        }

        return this.data.filter(other =>
            other.id !== id && other[field] === item[field]
        ).map(item => ({...item}));
    }
}