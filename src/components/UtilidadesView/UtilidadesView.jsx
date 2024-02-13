// import ViewsHome from "../ViewsHome/ViewsHome";
import Navbar from "../Navbar/Navbar.jsx";
// import CashTable from "../CashTable/CashTable.jsx";
import PostNumber from "../PostNumber/PostNumber.jsx";
// import CashTableAdmin from "../CashTableAdmin/CashTableAdmin.jsx"
// import CajaComponent from "../CajaComponent/CajaComponent.jsx";
import { useState } from "react";

function UtilidadesView(){
const [showDialog, setShowDialog] = useState(false);

const handleClick = () => {
setShowDialog(true)
}

    return(
        <>
              {showDialog && (
        <PostNumber
          open={showDialog}
          onClose={() => setShowDialog(false)}
        />
      )}

        <Navbar/>
        <br></br>
        <div style={{display:"flex", justifyContent:"center", margin:"1rem"}}>
            <button style={{backgroundColor:"yellow",borderRadius: '10px', padding: "10px 20px", marginLeft:"8px", placeSelf:"center" }} onClick={handleClick}>Agregar numero</button>
        </div>
        
        </>
    )
}

 export default UtilidadesView;