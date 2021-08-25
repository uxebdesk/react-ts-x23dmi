import React, { useState, useEffect } from 'react';
import { COLORS_GROUP, COLORS_HUE_LEVEL } from './config/color.config'
import { FiSun, FiMoon } from "react-icons/fi";

const Colors = () =>{
  const [theme, setTheme] = useState({mode:'light'}) 
  const colorScheme = ['enamel-blue', 'orange-pi']
  /** First init */
  useEffect(() => {
    document.documentElement.setAttribute('theme', 'mimiti')
    document.documentElement.setAttribute('theme-mode', 'light') 
    document.body.setAttribute('theme-color', 'enamel-blue')
    document.documentElement.setAttribute('theme-fontsize', 'medium')
  
    setTimeout(() => {
      document.body.setAttribute('theme-shape', 'rounded')
      document.body.classList.add("eui", "theme")
    }, 1000);
  }, []);

  const onChangeColorScheme = (e)=>{ 
    document.body.setAttribute('theme-color', e.target.value)
  }

  const onChangeToggleTheme = (th)=>{
    setTheme({...theme, mode:th})
    document.documentElement.setAttribute('theme-mode', th)
  }

  return(
    <div className="mt-2">
      <div className="d-flex">
        <div className="title flex-grow-1">
          <h2 className="mt-1 text-uppercase">Colors Preview</h2>
        </div>
        <div className="right pt-1">
            < select
              onChange={e => onChangeColorScheme(e)}
              className="browser-default custom-select" >
              {
                colorScheme.map((scheme, key) => <option value={scheme}>{scheme}</option>)
              }
            </select >
            <div 
              className="btn-group ms-3" 
              role="group" 
              aria-label="Basic example">
              <button 
                type="button" 
                className={`btn ${theme.mode==='light' ? 'btn-primary':'btn-outline-primary'}`}
                onClick={(e)=>onChangeToggleTheme('light')}>
                  <FiSun />
              </button>
              <button 
                type="button" 
                className={`btn ${theme.mode==='dark' ? 'btn-primary':'btn-outline-primary'}`}
                onClick={(e)=>onChangeToggleTheme('dark')}>
                  <FiMoon />
              </button>
            </div>

        </div>
      </div>
      <hr className="mb-4" />
      
      {
        COLORS_GROUP.map((group, i)=>{
          return (
            <div className="mb-4" key={`group`+i}>
              <h4 className="text-capitalize mb-1">{group.name}</h4>
              <p className="text-muted mb-4"> <span className="text-capitalize">{group.name}</span> color design system generator and preview</p>
              {
                group.colors.map((color, i)=>{
                  return (
                    <div className="color"> 
                      {
                        color!=='black' &&
                          <p className="text-muted text-small mt-3 mb-2 text-capitalize">{color} color hue</p>
                      }
                      <div className="grid grid--fit"> 
                        { COLORS_HUE_LEVEL.map((level, i)=>{
                          return (
                            <div className="col">
                              <div 
                                className="color-hue" 
                                style={{
                                  background:`var(--${color}-${level})`,
                                  color:`var(--${color}-${level}-cc)`,
                                }}>
                                  {level}
                              </div>
                            </div> 
                          )
                        })} 
                      </div>
                    </div>
                  )
                })
              }
            </div>
          )
        })
      } 
    </div>
  )
}

export default Colors;