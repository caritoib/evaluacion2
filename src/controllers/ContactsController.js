const ContactsDAO = require('../models/dao/ContactsDAO')

class ContactsController {
  constructor (db) {
    this.contactsDao = new ContactsDAO(db)
    this.renderHomeWithContacts = this.renderHomeWithContacts.bind(this)
    this.renderSingleContact = this.renderSingleContact.bind(this)
    this.renderContactCreationForm = this.renderContactCreationForm.bind(this)
    this.renderContactUpdateForm = this.renderContactUpdateForm.bind(this)
    this.insertAndRenderContact = this.insertAndRenderContact.bind(this)
    this.updateAndRenderContact = this.updateAndRenderContact.bind(this)
    this.deleteContactAndRenderResponse = this.deleteContactAndRenderResponse.bind(this)
  }

  async renderHomeWithContacts (req, res) {
    const persons = await this.contactsDao.getAll()
    res.render('home', {
      persons
    })
  }

  async renderSingleContact (req, res) {
    const id = req.params.id
    console.log(id)
    try {
      const contact = await this.contactsDao.getById(id)
      if (!contact) {
        res.status(404).render('404')
        return
      }

      res.render('contact', {
        id,
        picture: contact.picture,
        first_name: contact.first_name,
        last_name: contact.last_name,
        email: contact.email,
        phone: contact.phone
      })
    } catch (error) {
      console.log(error)
      res.status(500).render('500')
    }
  }

  renderContactCreationForm (req, res) {
    res.render('contact-form')
  }

  async renderContactUpdateForm (req, res) {
    const id = req.params.id

    try {
      const contact = await this.contactsDao.getById(id)

      if (!contact) {
        res.status(404).render('404')
        return
      }

      res.render('contact-form', {
        id,
        picture: contact.picture,
        firstname: contact.first_name,
        lastname: contact.last_name,
        email: contact.email,
        phone: contact.phone
      })
    } catch (error) {
      console.log(error)
      res.status(500).render('500')
    }
  }

  async insertAndRenderContact (req, res) {
    const picture = req.body.picture
    const firstname = req.body.first_name
    const lastname = req.body.last_name
    const email = req.body.email
    const phone = req.body.phone

    const contact = { picture, firstname, lastname, email, phone }

    try {
      const id = await this.contactsDao.create(contact)

      res.redirect(`/contacts/${id}`)
    } catch (error) {
      console.log(error)
      console.log('queo la caga wn!!')
      res.status(500).render('500')
    }
  }

  async updateAndRenderContact (req, res) {
    const id = req.params.id
    const picture = req.body.picture
    const firstname = req.body.first_name
    const lastname = req.body.last_name
    const email = req.body.email
    const phone = req.body.phone

    try {
      const contact = { id, picture, firstname, lastname, email, phone }
      console.log(contact)
      await this.contactsDao.update(contact)
      res.redirect(`/contacts/${id}`)
    } catch (error) {
      console.log(error)
      res.status(500).render('500')
    }
  }

  async deleteContactAndRenderResponse (req, res) {
    const id = req.params.id

    try {
      const contact = await this.contactsDao.getById(id)

      if (!contact) {
        res.status(404).render('404')
        return
      }

      await this.contactsDao.delete(id)

      res.render('contact-deleted', {
        id,
        first_name: contact.first_name,
        last_name: contact.last_name
      })
    } catch (error) {
      console.log(error)
      res.status(500).render('500')
    }
  }
}

module.exports = ContactsController
