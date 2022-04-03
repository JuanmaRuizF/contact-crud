class CreateContacts < ActiveRecord::Migration[6.1]
  def change
    create_table :contacts do |t|
      t.string :firstName, null:false
      t.string :lastName, null:false
      t.string :email, null:false
      t.integer :phoneNumber, null:false
      t.string :historyEdits
      t.timestamps
    end
  end
end
