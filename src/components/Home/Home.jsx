import CardComponent from '../CardHome/CardHome';
import ViewsHome from '../ViewsHome/ViewsHome';
import './Home.css';

function Home() {
  const objeto = [
    {
      nombre: "Usuarios",
      detalle: "Ver todos los usuarios",
      link: "/usuarios"
    },
    {
      nombre: "Crear usuario",
      detalle: "formulario nuevo",
      link: "/form"
    },
    {
      nombre: "Ver Clientes",
      detalle: "Clientes existentes",
      link: "/clientes"
    },
    {
      nombre: "Caja",
      detalle: "detalle y movimientos",
      link: "/caja"
    },
    {
      nombre: "Tickets",
      detalle: "detalle y validación",
      link: "/ticketView"
    },
  ];

  const firstThree = objeto.slice(0, 3); // Obtener los primeros 3 elementos
  const remainingTwo = objeto.slice(3); // Obtener los elementos restantes

  return (
    <>
      <ViewsHome />

      <div className="containerHomeGrid">
        <div className="globalContainerCard">
          {/* Renderizar los primeros 3 elementos en un grid */}
          {firstThree.map((item, index) => (
            <CardComponent key={index} nombre={item.nombre} detalle={item.detalle} link={item.link} />
          ))}
        </div>
          </div>
          {/* <br/> */}
          <div className="containerHomeGrid">
        <div className="containerCentered">
          {/* Renderizar los elementos restantes centrados */}
          {remainingTwo.map((item, index) => (
            <CardComponent key={index} nombre={item.nombre} detalle={item.detalle} link={item.link} />
          ))}
        </div>
        </div>

    </>
  );
}

export default Home;
