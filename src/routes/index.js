import clienteRoute from "./clienteRoute";
import comprasRoute from "./comprasRoute";


function Routes(app)
{
    clienteRoute(app);
    comprasRoute(app);

}
export default Routes;