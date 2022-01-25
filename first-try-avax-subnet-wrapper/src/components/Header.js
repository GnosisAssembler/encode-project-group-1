import "./Header.css";
import redLogo from './images/AVAX-logo.png';

function Header() {
  return (
    <div className="Header">
      <h1>Create an Avalanche subnet</h1>
      <img src={redLogo} alt="Avalanche logo" width="100" height= "100" />      
      <p>
        Each blockchain has some genesis state when it’s created. Each VM
        defines the format and semantics of its genesis data. Your can specify
        the genesis data below or leave the fields blank for the default values.
        <br></br>
        <br></br>
        <a href="https://docs.avax.network/build/tutorials/platform/subnets/">Read more about AVAX subnets here</a>

      </p>
    </div>
  );
}

export default Header;
