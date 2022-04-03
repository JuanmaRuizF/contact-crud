class Api::V1::ContactsController < ApplicationController

  skip_before_action :verify_authenticity_token

  def index
    def contact = Contact.all()
    render json: contact
  end

  # def create
  #   contact = Contact.create!(contact_params)
  #   if contact
  #     render json:contact
  #   else
  #     render json:contact.errors
  #   end

  #   #  @contact = Contact.new(contact_params)
  #   #   @contact.save

  # end

    def create
    @contact = Contact.new(contact_params)
    @contact.save
  end

  def edit
       
      @contact = Contact.find(params[:id])    
      if @contact.update(contact_params)  
      else
        render :edit
      end
    
    end
  def show
    @contact = params[:id]
    @contact = Contact.where(id: @contact)

    render json:@contact
  end

  def destroy
    @contact = Contact.find(params[:id])
    
    Contact.where(id: @contact ).destroy_all  

    # render json:@contact
    # contact&.destroy
    render json: { message: 'Contact deleted!' }
  end

  private

    def contact_params
      params.permit(:firstName, :lastName, :email, :phoneNumber)
    end

    # def contact
    #   @contact ||= Contact.find(params[:id])
    # end
  end

