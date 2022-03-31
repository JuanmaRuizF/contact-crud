class ContactController < ApplicationController

    def index
        @contacts = Contact.all()
    end
end
