export const SelctStyles = {
  control: (base: any, state: { isFocused: any }) => ({
    ...base,
    background: 'rgb(75 85 99)',
    // match with the menu
    borderRadius: state.isFocused ? '3px 3px 0 0' : 3,
    // Overwrittes the different states of border
    borderColor: 'transparent',
    color: 'white',
    // Removes weird border around container
    boxShadow: null,
    '&:hover': {
      // Overwrittes the different states of border
      borderColor: 'transparent'
    }
  }),
  menu: (base: any) => ({
    ...base,
    // override border radius to match the box
    borderRadius: 0,
    // kill the gap
    marginTop: 0
  }),
  menuList: (base: any) => ({
    ...base,
    // kill the white space on first and last option
    padding: 0,
    background: 'rgb(75 85 99)'
  }),
  option: (base: any) => ({
    ...base,
    background: 'rgb(75 85 99)',
    color: 'white',
    '&:hover': {
      // Overwrittes the different states of border
      background: 'rgb(55 65 81)'
    }
  }),
  singleValue: (base: any) => ({
    ...base,
    color: 'white'
  }),
  input: (base: any) => ({
    ...base,
    color: 'white'
  }),
  dropdownIndicator: (base: any) => ({
    ...base,
    color: 'white'
  }),
  placeholder: (base: any) => ({
    ...base,
    color: 'white'
  })
};
