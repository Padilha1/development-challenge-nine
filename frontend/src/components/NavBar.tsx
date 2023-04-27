import { Box } from "@mui/material"


export const NavBar = () => {
  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent:'space-evenly',
      paddingBottom: 12
    }}>
        <img src="/logoLarge.png" width="500"/>
        
        <a href="">List Patient</a>
        <a href="">List Patient</a>
        
      </Box>
  )
}
