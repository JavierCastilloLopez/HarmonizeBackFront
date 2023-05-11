import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import './css/user.css'
export function User({ serverURL }) {

    const [data, setData] = useState()




    return (
        <div className="config">
            <div className='PerfilImagen'>
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAI0AAACNCAMAAAC9gAmXAAAAb1BMVEX///8rLzK8vb0ZHiIjKCsAAABOUFInKy74+PgiJioVGx8dIiYLExjKy8slKS0TGR7d3d7q6uqPkJHx8vJnamtbXV81ODsACxF9f4DX19fExMWnqKliZGZFSEqcnZ5UVlmGh4g+QUR0dniztLQAAAu4KtCqAAADz0lEQVR4nO2bCZKjMAwAA+bGxBzhTsKV/79xYVOpLBkuC4vMVrk/MF2OZAnJczpJJBKJRCKRSH4zVuAVqqoWXmB928Qvr7dEcwkhrpbcrqX/PaPgXunUNpUXpk316h58xSVvU6Ipn2gkbfPDXaLQJj9UnhA7jI6VURU24zLAFPVAFyt0zgsyinJ2wsPC2aroossArQ7SCQx3VUZRXOOQ5IqqLTK9TnVALFvVXC59Qg74seqlZBrDamyZbrtMr9PhykQ6h4yi6LihU28NmiekxpTx1i+aMdRDtLlsS+437gVPJueV6XXwCnoIsAmxZKzEXP/zH5wTrCvQ40vvJzpWHId86f2EYP1U8XJTM805xpEJGv6w6Vv3BqezyCEyvQ5Ojhe8F/ETWqDYqEAbnI69BNqUODY8rc0bhmTzq86mA9rgNIC/K6c8/go+4OIUKh9QwvvLL/FRbCwDZGMgtRQZ5KdyMxyZk5oCbFKs4UkEOhu0T6oW0Be3WDIn1eG2cRCnXMbPseMymoEnw18ckMrCEyvmOxwtRh3h5JwzCuTRccbzW1Gsm++Fdd2e5e4VfdTmK1u/qs4KTr0ckdvbiqdpH7Jv8LQtp3PWMAdJ/5Cn67HjpodtYoJ47fOBxQeuqaKMLl2DGs2O3Ql5xmMumM2HcVDIvLHKm2NPuNjOrfzGcjPqYp2N0t20mR53By/u3gT3ttEodYhLHEq1pv3SjvUtlKtlmLVZWKr5l1UkE+TlUkX0ywNX4lYXM4e13nTyRF7LCKu6g9K8i+lw0bjMqIvPP2kVtcGGKmbTCnlV9hevSV8l3HQfj6YuVS/3fT/31LJuHg/3dQGZaYMzK3kTXdzxBWwS1p9UkiT9aTAyLhYauaDehKrCubtDfMIQZYx3tm8yrGoeXCFDUXZFuaH9DR3fFG6K0KwXCmzNMHw7CG93vJU3LkuYRLCO50BPBkHHV3hHJWO0RGAoRxPPxfiwibBEtwATtk9IK6qKhrCR/hh6FyPjQVa9PxEUycbUhwo/tpARYAiZWU+RCtiM+4JcBvaXiFZM1AyQ3ZNsH/J2Yg597+GA9i5z7N3HAN8HzLHz3UDIv1lYwtmVVha4qZnGVPbUh0JcQj0hez5qapExPODWcJkItOVdwkzgnQXnjmMLO/YggjNqgMEbiwremc9xrqAyEeih1jJmAw2cXLjLADRwACvedcA3TolhA36qBHr7uAb4baTQbuIFuKvgftu8yQb6/rkS87EwxoZeONzvFLYAfssgbaTN/29zo0Q89Aa0Gf5FVTzYyweJRCKRSCQSyRx/AHdgPJEgMaXjAAAAAElFTkSuQmCC" alt="" />
                <div className='inCircle'><FontAwesomeIcon icon={faEdit} ></FontAwesomeIcon></div>
            </div>
            <div className='userData'>
                <div>
                    <span>Nombre</span>
                   <div> <p>javier</p></div>
                </div>
                <div>
                    <span>Apellido</span>
                    <div> <p>castillo</p></div>
                </div>
                <div>
                    <span>Correo</span>
                    <div> <p>javare660@gmail.com</p></div>
                </div>
            </div>








        </div>
    )




x
}