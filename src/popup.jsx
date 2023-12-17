import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import { CloseButton } from "@chakra-ui/close-button";
import {
  ChakraProvider,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Switch,
  SimpleGrid,
  Circle,
  Tooltip,
  Button,
  useDisclosure,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
} from "@chakra-ui/react";

import { IoMdSettings, IoMdColorPalette } from "react-icons/io";
import { BlockPicker } from "react-color";

function Popup() {
  const presetColors = [
    "#FFB3BA",
    "#FFDFBA",
    "#FFFFBA",
    "#BAFFC9",
    "#BAE1FF",
    "#D1BBFF",
  ];
  const [colorPalette, setColorPalette] = useState([]);

  // Get the color palette from local storage when the component mounts
  useEffect(() => {
    chrome.storage.local.get(["colorPalette"], function (result) {
      setColorPalette([...presetColors, ...(result.colorPalette || [])]);
    });
  }, []);

  const handleClose = () => {
    window.close();
  };

  return (
    <ChakraProvider>
      <div style={{ width: "225px" }}>
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
            <Tab>
              <IoMdColorPalette style={{ margin: "2px" }} /> Colors
            </Tab>
            <Tab>
              <IoMdSettings style={{ margin: "2px" }} /> Settings
            </Tab>
          </TabList>
          <TabPanels>
            {/* Color Pallete */}
            <TabPanel>
              <SimpleGrid columns={6} spacing={2}>
                {colorPalette.map((color, index) => (
                  <Tooltip label={color} key={index}>
                    <Circle
                      key={index}
                      bg={color}
                      h="20px"
                      w="20px"
                      boxShadow="xs"
                    />
                  </Tooltip>
                ))}
              </SimpleGrid>
              

              <Button m={4} size="xs">
                Add Color
              </Button>
              <BlockPicker/>
            </TabPanel>

            {/* Settings */}
            <TabPanel>
              Enable colour overlay?
              <Switch size="sm" style={{ marginLeft: "10px" }} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </ChakraProvider>
  );
}

render(<Popup />, document.getElementById("react-target"));
