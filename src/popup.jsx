import React, { useState } from "react";
import { render } from "react-dom";
import { BlockPicker } from "react-color";
import { CloseButton } from "@chakra-ui/close-button";
import {
  ChakraProvider,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Switch,
} from "@chakra-ui/react";
import { IoMdSettings, IoMdColorPalette } from "react-icons/io";

function Popup() {
  const [background, setBackground] = useState("#d9e3f0");

  const handleChangeComplete = (color) => {
    setBackground(color.hex);
  };

  const handleClose = () => {
    window.close();
  };

  return (
    <ChakraProvider>
      <div style={{ width: "200px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <img
            src={chrome.runtime.getURL("logo.png")}
            alt="Logo"
            style={{ width: "60px", margin: "10px" }}
          />

          <CloseButton
            onClick={handleClose}
            size="sm"
            border="none"
            _hover={{ cursor: "pointer" }}
            color="light-grey"
            style={{
              borderRadius: "50%",
              backgroundColor: "transparent",
              margin: "10px",
            }}
          />
        </div>

        <Tabs align="center" variant="enclosed" size="sm">
          <TabList>
            <Tab> <IoMdColorPalette style={{margin: "2px"}}/> Colors </Tab>
            <Tab> <IoMdSettings  style={{margin: "2px"}}/> Settings </Tab>
          </TabList>
          <TabPanels>
            {/* Color Pallete */}
            <TabPanel>
              <BlockPicker
                color={background}
                onChangeComplete={handleChangeComplete}
              />
            </TabPanel>

            {/* Settings */}
            <TabPanel>
              Enable colour overlay?
              <Switch size="sm" style={{marginLeft:'10px'}}/>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </ChakraProvider>
  );
}

render(<Popup />, document.getElementById("react-target"));
