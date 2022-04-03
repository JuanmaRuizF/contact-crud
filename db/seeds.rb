# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
contacts = Contact.create([
    {
        firstName: "Juan",
        lastName: "Ruiz",
        email: "juan@gmail.com",
        phoneNumber: 987654321,
        historyEdits: ""
    },{
        firstName: "Néstor",
        lastName: "García",
        email: "nestor@gmail.com",
        phoneNumber: 987654321,
        historyEdits: ""
    },{
        firstName: "Pepe",
        lastName: "García",
        email: "pepe@gmail.com",
        phoneNumber: 987654321,
        historyEdits: ""
    },{
        firstName: "Luis",
        lastName: "García",
        email: "luis@gmail.com",
        phoneNumber: 987654321,
        historyEdits: ""
    }
])
