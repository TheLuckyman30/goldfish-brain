import { FishOutWithTask } from '@repo/api/fish';
import fish1 from '../../images/fishAssets1.png';
import fish2 from '../../images/fishAssets2.png';
import fish3 from '../../images/fishAssets3.png';
import fish4 from '../../images/fishAssets4.png';
import fish5 from '../../images/fishAssets5.png';
import fish6 from '../../images/fishAssets6.png';
import fish7 from '../../images/fishAssets7.png';
import fish8 from '../../images/fishAssets8.png';
import fish9 from '../../images/fishAssets9.png';




interface CaughtFishProps {
  caughtFish: FishOutWithTask;
}

function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min); // Ensure min is an integer
  max = Math.floor(max); // Ensure max is an integer
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function CaughtFish({ caughtFish }: CaughtFishProps) {

  const fishArray = [fish1, fish2, fish3, fish4, fish5, fish6, fish7, fish8, fish9];

  

  return (
    <div>
      
      

      <section className="bg-white p-6 rounded-[60px] shadow-md ">

      
        
      <section className="overflow-hidden overflow-y-auto h-[35vh]">
        <img
        src={fishArray[getRandomInt(0, fishArray.length - 1)]}
        alt="Caught Fish"
        className="w-[10vw] h-auto mb-2 rounded-[30px] mx-auto"
      />
      <div className="font-bold text-[#794531fb] mb-2 text-3xl">Task Name: </div>
      <div className="text-2xl mb-4 text-[#538f97]">{caughtFish.task.name}</div>

      <div className="font-bold mb-2 text-3xl text-[#794531fb]">Task Description: </div>
      <div className="text-2xl mb-4 text-[#538f97] h-[5vh] ">{caughtFish.task.description}</div>
      </section>
      
      <div className='flex flex-row gap-5 items-center text-2xl mb-2 mt-2 text-[#794531fb] bg-[#bee5ea] w-full p-2 rounded-[60px]'>
      <div>Rarity: {caughtFish.rarity}</div>
      <div>Size: {caughtFish.size} in. </div>
      </div>
      </section>

    
    </div>
  );
}

export default CaughtFish;
