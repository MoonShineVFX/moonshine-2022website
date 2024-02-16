import React from 'react'
import { GoogleMap, LoadScript ,Marker} from '@react-google-maps/api';
import { useTranslation } from 'react-i18next';
import ImgHeader from '../../../Components/ImgHeader'
import Header from '../../../Components/Header';
function Contact() {
  const { t } = useTranslation();
  const containerStyle = {
    width: '100%',
    height: '320px',
  };
  // 地圖樣式
  const styles =[
    {
      "stylers": [
          {
              "hue": "#ff1a00"
          },
          {
              "invert_lightness": true
          },
          {
              "saturation": -100
          },
          {
              "lightness": 33
          },
          {
              "gamma": 0.5
          }
        ]
      },
      {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [
              {
                  "color": "#2D333C"
              }
          ]
      }
  ]
  const center = {
    lat: 25.058695,
    lng: 121.579339
  };
  return (
    <section id="contact">
      <Header v_url="https://vimeo.com/342892008" start_time="3"  tpa_display={false} />
      
      <div className="w-5/6 mx-auto -mt-60 z-10 relative">
        <h1 className='text-3xl font-bold mb-5' >Contact</h1>
        <div id="map" className="mt30">
          <LoadScript
            googleMapsApiKey="AIzaSyApNCPFkYkG39dPQkZjxrH6q3RrNITXkns"
          >
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={17.5}
              options={{
                disableDefaultUI: true,
                styles: styles,
              }}
            >
              <Marker 
                position={{
                  lat: 25.058695,
                  lng: 121.579339
                }}
                icon={process.env.PUBLIC_URL + '/images/MS_landmark.svg'}
              />
              { /* Child components, such as markers, info windows, etc. */ }
              <></>
            </GoogleMap>
          </LoadScript>
        </div>
        <div className="contact_info mt-16">
          <div className="text-lg mt-5 font-light">
            <div className='flex flex-col lg:flex-row gap-20'>
              <div>
                <div className=' text-xl mb-5 font-bold'>TAIPEI</div>
                <div className=' text-sm'>
                  info@moonshine.tw <br />
                  5F., No. 188, Xingshan Rd., Neihu Dist., Taipei City, 11469, Taiwan (R.O.C.) <br />
                  台北市內湖區行善路188號5樓
                  <br />
                  <br />
                  02-2785-7037 
                </div>
              </div>
              <div>
                <div className=' text-xl mb-5 font-bold'>KAOHSIUNG</div>
                <div className=' text-sm'>
                  info@moonshine.tw   <br />
                  A5CF., No. 1, Zhen'ai Rd., Yancheng Dist., Kaohsiung City 803003 , Taiwan (R.O.C.) 
                  <br />
                  高雄市鹽埕區真愛路1號 高流音浪塔
                </div>
              </div>
              <div>
                <div className=' text-xl mb-5 font-bold'>MONTREAL</div>
                <div className=' text-sm'>
                  Producer@moonshine.tw<br />
                  800, rue du Square-Victoria, bureau 3500, Montréal, Québec H4Z 1E9
                </div>
              </div>
            </div>
            <div className="mb-6"></div>

          </div>
         
        </div>
      </div>

    </section>

  )
}

export default Contact