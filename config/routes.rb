Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'contacts/index'
      post 'contacts/create'
      get '/show/:id', to: 'contacts#show'
      post '/destroy/:id', to: 'contacts#destroy'
      post '/edit/:id', to: 'contacts#edit'
    end
  end

  root 'contact#index'
  get '/*path' => 'contact#index'
end
