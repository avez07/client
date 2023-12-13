import * as React from "react";
import {
  Box,
  Button,
  TextField,
  Modal,
  useMediaQuery,
  useTheme,
  FormControl,
  Select,
  MenuItem,
  Alert
} from "@mui/material";
import { MdClose,MdAdd } from "react-icons/md";
import { Country, State, City } from "country-state-city";
import { Key } from "@mui/icons-material";

export default function BasicModal() {
  const theme = useTheme();
  const isMpbile = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = React.useState(false);
  const handleModal = () => setOpen(!open);

  const [fullname, setFullNmae] = React.useState("");
  const [phoneNo, setPhoneNo] = React.useState("");
  const [pinCode, setPinCode] = React.useState("");
  
  const [addresslin1, setAddresslin1] = React.useState("");
  const [addresslin2, setAddresslin2] = React.useState("");
  const [addresslin3, setAddresslin3] = React.useState("");
  
  const [selectedCountry, setSelectedCountry] = React.useState("");
  const [selectedState, setSelectedState] = React.useState("");
  const [selectedcity, setSelectedcity] = React.useState("");

  const style = {
    position: "absolute",
    top: "70%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isMpbile ? 300 : 600,
    bgcolor: "background.paper",
    borderRadius: "7px",
    boxShadow: 24,
    overflow: "auto",
    marginBottom:"20px"
    // padding: '16px 20px',
  };
 

  const country = Country.getAllCountries();
  const state = State.getStatesOfCountry(selectedCountry);
  const city = City.getCitiesOfState(selectedCountry,selectedState);

  
  // console.log(city);

  return (
    <div>
      <Alert severity="error">This is an error alert — check it out!</Alert>
      <Button style={{alignItems:'baseline'}} onClick={handleModal}><span style={{fontSize:'15px'}}><MdAdd /></span>Add new Address</Button>
      <Modal
        open={open}
        onClose={handleModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ overflowY: "auto" }}
      >
        <Box sx={style}>
          <div className="add-model-head">
            <span>enter your new address</span>
            <span>
              <MdClose
                className="fs-4"
                style={{ cursor: "pointer" }}
                onClick={handleModal}
              />
            </span>
          </div>
          <div className="model-body" style={{ padding: "16px 24px" }}>
            <h4>Add a new address</h4>
            <div className="country div">
              <p className=" fw-semibold mb-0 mt-2">Country/Region</p>
              <FormControl
                className="add-model-form"
                sx={{ my: 1, width: "100%" }}
                size="small"
              >
                <Select
                  labelId="emo-select-small-label"
                  id="demo-select-small"
                  value={selectedCountry}
                  onChange={(e)=>setSelectedCountry(e.target.value)}
                  sx={{
                    background: "#f0f2f2",
                    boxShadow: "0 2px 5px #0f111126",
                  }}
                >
                  {country.map((value, index) => {
                    return (
                      <MenuItem key={index} value={value.isoCode}>
                        {value.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>

            <div className="fullname">
              <p className=" fw-semibold my-2">
                Full Name(frist name & last name)
              </p>
              <TextField
                sx={{ width: "100%" }}
                id="outlined-multiline-flexible"
                size="small"
                onChange={(e)=>setFullNmae(e.target.value)}
              />
            </div>
            <div className="phone number">
              <p className=" fw-semibold my-2">Phone Number</p>
              <TextField
                sx={{ width: "100%" }}
                id="outlined-multiline-flexible"
                size="small"
                onChange={(e)=>setPhoneNo(e.target.value)}
              />
            </div>
            <div className="pincode">
              <p className=" fw-semibold my-2">Pincode</p>
              <TextField
                sx={{ width: "100%" }}
                id="outlined-multiline-flexible"
                size="small"
                onChange={(e)=>setPinCode(e.target.value)}
              />
            </div>
            <div className="addressline 1">
              <p className=" fw-semibold my-2">
                Flat, House no., Building, Company, Apartment
              </p>
              <TextField
                sx={{ width: "100%" }}
                id="outlined-multiline-flexible"
                size="small"
                onChange={(e)=>setAddresslin1(e.target.value)}
              />
            </div>
            <div className="address-line-2">
              <p className=" fw-semibold my-2">Area, Street, Sector, Village</p>
              <TextField
                sx={{ width: "100%" }}
                id="outlined-multiline-flexible"
                size="small"
                onChange={(e)=>setAddresslin2(e.target.value)}
              />
            </div>
            <div className="addressline-3">
              <p className=" fw-semibold my-2">Landmark</p>
              <TextField
                sx={{ width: "100%" }}
                id="outlined-multiline-flexible"
                size="small"
                onChange={(e)=>setAddresslin3(e.target.value)}
              />
            </div>
            <div className="d-flex justify-content-between">
              <div className="state div me-2" style={{ width: "50%" }}>
                <p className=" fw-semibold mb-0 mt-2">state</p>
                <FormControl
                  className="add-model-form"
                  sx={{ my: 1, width: "100%" }}
                  size="small"
                >
                  <Select
                    labelId="emo-select-small-label"
                    id="demo-select-small"
                    value={selectedState}
                    onChange={(e)=>setSelectedState(e.target.value)}
                  >
                     {selectedCountry !== ''
                      ? state.map((value, index) => (
                          <MenuItem key={index} value={value.isoCode}>
                            {value.name}
                          </MenuItem>
                        ))
                      : null}
                  </Select>
                </FormControl>
              </div>
              <div className="citie div ms-2" style={{ width: "50%" }}>
                <p className=" fw-semibold mb-0 mt-2">City/Town</p>
                <FormControl
                  className="add-model-form"
                  sx={{ my: 1, width: "100%" }}
                  size="small"
                >
                  <Select
                    labelId="emo-select-small-label"
                    id="demo-select-small"
                    value={selectedcity}
                    onChange={(e)=>setSelectedcity(e.target.value)}
                    sx={{
                      background: "#f0f2f2",
                      boxShadow: "0 2px 5px #0f111126",
                    }}
                  >
                    {selectedState !== '' && selectedCountry !==''
                      ? city.map((value, index) => (
                          <MenuItem key={index} value={value.name}>
                            {value.name}
                          </MenuItem>
                        ))
                      : null}
                  </Select>
                </FormControl>
              </div>
            </div>
            <Button fullWidth variant="contained" color="warning" sx={{my:3}}>Save</Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
