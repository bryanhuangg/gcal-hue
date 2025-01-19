import {
  Box,
  Button,
  ChakraProvider,
  Circle,
  SimpleGrid,
  Switch,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { IoMdColorPalette, IoMdSettings } from "react-icons/io";
import React, { useEffect, useRef, useState } from "react";
import { Toaster, toast } from 'react-hot-toast';

import { BlockPicker } from "react-color";
import { CloseButton } from "@chakra-ui/close-button";
import { MdDelete } from "react-icons/md";
import ReactDOM from 'react-dom/client';

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

  const buttonRef = useRef(null);
  const colorPickerRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (colorPickerRef.current && !colorPickerRef.current.contains(event.target) && buttonRef.current !== event.target) {
        setShowPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


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

  // Update the color when the color picker changes
  const handleColorChange = (color) => {
    setColor(color.hex);
  };


  // Clear the color palette
  const handleClearPalette = () => {
    chrome.storage.local.remove('colorPalette', function () {
      setColorPalette([]);
    });
  };

  const handelClearColors = () => {
    // Get color palette data
    chrome.storage.local.get('colorPalette', function (result) {
      let colorPaletteData = result.colorPalette;

      // Clear local storage
      chrome.storage.local.clear(function () {
        let error = chrome.runtime.lastError;
        if (error) {
          console.error(error);
        } else {
          // Set color palette data back to local storage
          chrome.storage.local.set({ colorPalette: colorPaletteData })
        }
      });
    });
  }

  // Button action to either open the color picker or save the color
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
              <IoMdColorPalette style={{ margin: "2px" }} /> <span style={{ fontWeight: '500' }}> Colors </span>
            </Tab>
            <Tab>
              <IoMdSettings style={{ margin: "2px" }} /> <span style={{ fontWeight: '500' }}> Settings </span>
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
                <Button ref={buttonRef} size="xs" onClick={openPickerOrSaveColor}>
                  {showPicker ? 'Save Color' : 'Open Color Picker'}
                </Button>
                <div ref={colorPickerRef}>
                  {showPicker && (
                    <Box mt={4}>
                      <BlockPicker color={color} colors={presetColors} onChangeComplete={handleColorChange} />
                    </Box>
                  )}
                </div>
              </Box>

            </TabPanel>

            {/* Settings */}
            <TabPanel>
              {/* Enable colour overlay?
              <Switch size="sm" style={{ marginLeft: "10px" }} /> */}

              <Button mt={2} size="xs" colorScheme="gray" onClick={handleClearPalette}>Clear Palette</Button>
              <Button mt={2} size="xs" colorScheme="red" onClick={handelClearColors}>Clear Event Colors</Button>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </ChakraProvider>
  );
}

const rootElement = document.getElementById("react-target");
ReactDOM.createRoot(rootElement).render(<Popup />);