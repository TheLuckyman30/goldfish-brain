import loadingFish from '../../images/loadingFish.gif';
import fishBackground from '../../images/fishBackground.png';
import './loadingScreen.css'

export function Loading() {
  return (
    <div
    className="flex justify-center min-h-screen  w-lvw pt-45 bg-no-repeat bg-cover bg-top"
      style={{
        backgroundImage: `url(${fishBackground})`,
      }}
    >
    <div
      className="flex inset-0  items-center justify-center"
      role="status"
      aria-label="Loading"
    >
      <img src={loadingFish} alt="Loading" className="w-32vh h-32vh md:w-40vh md:h-40vh" />
    
      <div className= "typewriter"><h1 style={{fontSize:"30px", color:"white", position:"absolute"}}>Loading ...</h1></div>
    </div>
    
    </div>
  );
}