import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import i18next from 'i18next'
import cookies from 'js-cookie'
import { useNavDataE, useNavDataM } from '@/context/NavdataContext'

const languages = [
    {
      code: 'en',
      name: 'En',
    },
    {
      code: 'mm',
      name: 'Mm',
    },
]
export const LanguageDropDown = () => {
    const navDataE = useNavDataE();
    const navDataM = useNavDataM();
    const currentLanguageCode = cookies.get('i18next') || 'mm'
    const currentLanguage = languages.find((l) => l.code === currentLanguageCode)
    const { t } = useTranslation()

    useEffect(() => {
        document.body.dir = currentLanguage.dir || 'ltr'
        document.title = t('app_title')
    }, [currentLanguage, t])

    const onChangeLang = (e) => {
        if(e.target.value == "en") navDataE()
        else navDataM()
        // i18next.changeLanguage(e.target.value)
    }
    return (
        <div className="px-3 inline-block">
            <div className="mb-3 xl:w-15">
                <select 
                    onChange={onChangeLang}
                    defaultValue={currentLanguageCode}
                    className="form-select appearance-none
                    block
                    w-full
                    px-3
                    py-1.5
                    text-base
                    font-normal
                    text-gray-700
                    bg-white bg-clip-padding bg-no-repeat
                    border border-solid border-gray-300
                    rounded
                    transition
                    ease-in-out
                    m-0
                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example">
                    {languages.map(({ code, name }) => (
                        <option 
                            key={code} 
                            value={code} 
                        >{name}</option>
                    ))}
                </select>
            </div>
        </div>
    )
}
