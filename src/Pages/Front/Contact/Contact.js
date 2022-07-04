import React from 'react'
import { GoogleMap, LoadScript ,Marker} from '@react-google-maps/api';
import { useTranslation } from 'react-i18next';
import ImgHeader from '../../../Components/ImgHeader'
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
    lat: 25.051027,
    lng: 121.594860
  };
  return (
    <section id="contact">
      <ImgHeader imgPath={'work01.png'} />
      
      <div className="w-5/6 mx-auto -mt-60 z-10 relative">
        <h1 className='text-2xl font-bold mb-5' >{t('section_title7')}</h1>
        <div id="map" className="mt30">
          <LoadScript
            googleMapsApiKey="AIzaSyCY5JQ3g9D70gnfALdxc8z18XD7AtNw3wM"
          >
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={17}
              options={{
                disableDefaultUI: true,
                styles: styles,
              }}
            >
              <Marker 
                position={{
                  lat: 25.051027,
                  lng: 121.594860
                }}
                icon={process.env.PUBLIC_URL + '/images/MS_landmark.svg'}
              />
              { /* Child components, such as markers, info windows, etc. */ }
              <></>
            </GoogleMap>
          </LoadScript>
        </div>
        <div className="contact_info mt-16">
          <div className="infoArea flex xs:flex-wrap">
            <div className="infoContent flex-auto">
                <p className='text-gray-200'>Tel</p>
                <p>+886-2-27857037</p>
            </div>
            <div className="infoContent flex-auto">
                <p className='text-gray-200'>Email</p>
                <p>info@moonshine.tw</p>
            </div>
            <div className="infoContent flex-auto xs:mt-12">
                <p className='text-gray-200'>Address</p>
                <p>{t('address')}</p>
            </div>
          </div>
        </div>
      </div>

    </section>

  )
}

export default Contact