import React, { useState, useEffect, useRef } from "react";
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
  Text,
  Box,
} from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import { IoMdSettings, IoMdColorPalette } from "react-icons/io";
import { BlockPicker } from "react-color";
import { toast, Toaster } from 'react-hot-toast';

function Popup() {
  const presetColors = [
    "#FFB3BA",
    "#FFDFBA",
    "#FFFFBA",
    "#BAFFC9",
    "#BAE1FF",
  ];
  const [colorPalette, setColorPalette] = useState([]);
  const [showPicker, setShowPicker] = useState(false);
  const [color, setColor] = useState("#BAFFC9");
  const [hoveredIndex, setHoveredIndex] = useState(null);


  // Get the color palette from local storage when the component mounts
  useEffect(() => {
    chrome.storage.local.get(["colorPalette"], function (result) {
      if (result.colorPalette) {
        const validColors = result.colorPalette.filter(color => /^#([0-9A-F]{3}){1,2}$/i.test(color));
        setColorPalette(validColors);
        if (validColors.length !== result.colorPalette.length) {
          chrome.storage.local.set({ colorPalette: validColors });
        }
      }
    });
  }, []);

  const handleColorChange = (color) => {
    setColor(color.hex);
  };

  const handleClearPalette = () => {
    chrome.storage.local.remove('colorPalette', function () {
      setColorPalette([]);
    });
  };

  const openPickerOrSaveColor = () => {
    if (showPicker) {
      chrome.storage.local.get(['colorPalette'], function (result) {
        let newPalette = result.colorPalette ? [...result.colorPalette] : [];
        if (!newPalette.includes(color)) {
          newPalette.push(color);
          chrome.storage.local.set({ colorPalette: newPalette }, function () {
            setColorPalette(newPalette);
          });
        } else {
          toast.error('This color is already in your palette.', {
            duration: 1000,
            role: 'alert',
            ariaLive: 'assertive',
          });
        }
      });
    }
    setShowPicker(!showPicker);
  };
  const handleClose = () => {
    window.close();
  };

  return (
    <ChakraProvider>
      <Toaster position="bottom-center" />
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


              {colorPalette.length > 0 && (
                <SimpleGrid mb={4} columns={6} spacing={2}>
                  {colorPalette.map((color, index) => (
                    <Tooltip label={color} key={index}>
                      <Circle
                        key={index}
                        bg={color}
                        h="20px"
                        w="20px"
                        boxShadow="xs"
                        _hover={{ cursor: "pointer" }}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        onClick={() => {
                          const newColorPalette = [...colorPalette];
                          newColorPalette.splice(index, 1);
                          setColorPalette(newColorPalette);
                          chrome.storage.local.set({ 'colorPalette': newColorPalette });
                        }}
                      >
                        {hoveredIndex === index && <MdDelete size={'15px'} style={{ opacity: 0.5 }} />}
                      </Circle>
                    </Tooltip>
                  ))}
                </SimpleGrid>
              )}

              <Box>
                <Button size="xs" onClick={openPickerOrSaveColor}>
                  {showPicker ? 'Save Color' : 'Open Color Picker'}
                </Button>
                {showPicker && (
                  <Box mt={4}>
                    <BlockPicker color={color} colors={presetColors} onChangeComplete={handleColorChange} />
                  </Box>
                )}
              </Box>



            </TabPanel>

            {/* Settings */}
            <TabPanel>
              Enable colour overlay?
              <Switch size="sm" style={{ marginLeft: "10px" }} />

              <Button mt={2} size="xs" colorScheme="red" onClick={handleClearPalette}>Clear Colors</Button>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </ChakraProvider>
  );
}

render(<Popup />, document.getElementById("react-target"));
