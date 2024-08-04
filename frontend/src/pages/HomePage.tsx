import landingImage from '@/assets/landing.png'
import appDownloadImage from '@/assets/appDownload.png'
import SearchBar, { SearchForm } from '@/components/SearchBar';
import { useNavigate } from 'react-router-dom';
const HomePage = () =>{
    const navigate = useNavigate()
    const handleSearchSubmit = (searchFormValues : SearchForm) => {
        navigate({
            pathname:`/search/${searchFormValues.searchQuery}`
        })
    }
    return (
        <div className="flex flex-col gap-12">
            <div className=" md:px-32 bg-white rounded-lg shadow-md py-6 flex flex-col gap-4 text-center -mt-16">
                <h1 className="md:text-3xl text-[18px] font-bold tracking-tight text-red-500">
                    Tuck into a takeaway today
                </h1>
                <span className="md:text-lg text-[15px]">Food is just a click away!</span>
              <SearchBar placeHolder='Search by City or Town' onSubmit={handleSearchSubmit} searchQuery={''}/>
                
            </div>
            <div className="grid md:grid-cols-2 gap-5">
                <img src={landingImage} alt="" />
                <div className="flex flex-col items-center justify-center gap-4 text-center">
                    <span className="font-bold text-3xl tracking-tighter">
                        Order takeaway even faster!
                    </span>
        <span>Downloads the BiteBuzz App for faster ordering and personlised recommendtions.</span>
                    <img src={appDownloadImage} alt="" />
                </div>
            </div>
        </div>
    )
}

export default HomePage;