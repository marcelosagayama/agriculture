import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/farm-quantities', 'Dashboard/FarmQuantitiesController.index')
  Route.get('/total-hectares', 'Dashboard/TotalHectaresController.index')
  Route.get('/hectares-by-states', 'Dashboard/HectaresByStatesController.index')
  Route.get('/hectares-by-crops', 'Dashboard/HectaresByCropsController.index')
  Route.get('/hectares-divisions', 'Dashboard/HectaresDivisionsController.index')
}).prefix('/dashboard')
