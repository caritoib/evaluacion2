class ContactsDAO {
  constructor (dbClient) {
    this.db = dbClient
    this.getAll = this.getAll.bind(this)
    this.getById = this.getById.bind(this)
    this.create = this.create.bind(this)
    this.update = this.update.bind(this)
    this.delete = this.delete.bind(this)
  }

  async getAll () {
    const response = await this.db.query('SELECT id, picture, first_name, last_name, email, phone FROM contacts')
    const rows = response[0]
    return rows
  }

  async getById (id) {
    const response = await this.db.query('SELECT id, picture, first_name, last_name, email, phone FROM contacts WHERE id = ?', [id])
    const rows = response[0]
    return rows[0]
  }

  async create (contact) {
    const response = await this.db.query('INSERT INTO contacts (picture, first_name, last_name, email, phone) VALUES (?, ?, ?, ?, ?)', [contact.picture, contact.firstname, contact.lastname, contact.email, contact.phone])
    const result = response[0]
    return result.insertId
  }

  async update (contact) {
    const response = await this.db.query('UPDATE contacts SET picture = ?, first_name = ?, last_name = ?, email = ?, phone = ? WHERE id = ?', [contact.picture, contact.firstname, contact.lastname, contact.email, contact.phone, contact.id])
    const result = response[0]
    return result
  }

  async delete (id) {
    const response = await this.db.query('DELETE FROM contacts WHERE id = ?', [id])
    const result = response[0]
    return result
  }
}

module.exports = ContactsDAO
