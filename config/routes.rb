Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'contacts/index'
      post 'contacts/create'
      # post 'crearcontacto' => 'contacts/create'
      get '/show/:id', to: 'contacts#show'
      post '/destroy/:id', to: 'contacts#destroy'
      post '/edit/:id', to: 'contacts#edit'
    end
  end
  root 'homepage#index'
  get '/*path' => 'homepage#index'
 
  get 'contact/index'
end
