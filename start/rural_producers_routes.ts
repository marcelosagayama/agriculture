import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'RuralProducer/ListController.index')
  Route.post('/', 'RuralProducer/CreateController.index')
  Route.get('/:id', 'RuralProducer/GetController.index')
  Route.put('/:id', 'RuralProducer/EditController.index')
  Route.delete('/:id', 'RuralProducer/DeleteController.index')
}).prefix('/rural-producers')
