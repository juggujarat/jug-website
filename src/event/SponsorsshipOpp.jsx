import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SponsorsshipOpp = ({ sponsorship }) => {

    const handleCallClick = () => {
        const phoneNumber = sponsorship.phone.replace(/\s/g, "");
        const isMobile = /iPhone|Android/i.test(navigator.userAgent);
    
        if (isMobile) {
            window.open(`tel:${phoneNumber}`);
        } else {
            navigator.clipboard.writeText(phoneNumber)
                .then(() => {
                    toast.success("📞 Number copied! Paste it in your dialer.", {
                        position: "bottom-center",
                        autoClose: 2000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        style: { backgroundColor: "#000", color: "#fff" }
                    });
                })
                .catch(err => console.error("Failed to copy:", err));
        }
    };
    
    
  return (
    <div className="bg-[#FFFCEF] ">
    <div className="container mx-auto xl:max-w-screen-xl  ">
        <div className='pt-[128px] pb-[155px] sm:pt-[50px] sm:pb-[50px]'>
            <div className="flex flex-col items-center justify-center">
                <div className='mt-[20px] text-center px-[186px] sm:px-0'>
                    <h2 className="font-raleway font-medium text-[56px] leading-[62px] sm:text-[24px] sm:leading-[28px] tracking-[0%]">
                    Sponsorship Opportunities – Grow with the Java Community!
                    </h2>
                </div>
                <div className=" mt-[36px] px-[10px] py-0 ">
                    <div className="flex items-center gap-6 sm:flex-col  sm:gap-0 border-b border-black ">

                    <iframe
      src={sponsorship.deckEmbedUrl}
      title="Sponsorship deck"
      width="800"
      height="450"
      allowFullScreen
      loading="lazy"
      className=" border border-gray-300 rounded-lg sm:w-[320px] sm:h-[320px] md:w-[700px] md:h-[394px]"
    ></iframe>

                    </div>
                </div>

                <div>
                    <h3 className='text-center font-raleway font-medium text-[16px] leading-[22px] sm:text-[22px] sm:leading-[24px] tracking-[0%] mt-8'>
                    Let’s Talk Sponsorship!
                    </h3>
                    <button className="relative bg-black text-white px-[63px] py-[20px] sm:px-[32px] sm:py-[16px] rounded-2xl border-2 border-black overflow-hidden transition-all duration-300 group mt-7" onClick={handleCallClick}>
                        {/* Expanding background effect */}
                        <span className="absolute inset-0 bg-white scale-y-0 origin-bottom transition-transform duration-300 ease-in-out group-hover:scale-y-100"></span>

                        {/* Button text */}
                        <span className="relative z-10 text-white group-hover:text-black transition-colors duration-300 font-bold font-sans text-[18px] sm:text-[16px]">
                            Call {sponsorship.phone} Today!
                        </span>
                    </button>

                </div>
               
            </div>
        </div>
    </div>
</div>
  )
}

export default SponsorsshipOpp