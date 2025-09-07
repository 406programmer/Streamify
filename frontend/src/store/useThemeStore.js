import {create} from 'zustand';

export const useThemeStore=create((set)=>({
    theme : localStorage.getItem("streamify-theme") ||"forest",
    setTheme : (theme)=>{
        localStorage.setItem("streamify-theme",theme);
        (set({theme}));// it can also be written as (theme)=>(set({theme:theme}))
    }
}))