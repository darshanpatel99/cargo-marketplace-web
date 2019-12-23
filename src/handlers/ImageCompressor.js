import React, { useCallback, useState, Fragment } from "react";
import Resizer from 'react-image-file-resizer';

export default function ImageCompressor(width, height, file, props) {
    
    
        if(width!= undefined && height !=undefined){
            var isValid = width>300&&height>300;
            console.log(isValid)

            if (isValid){
                var isLandscape = width>height;
                console.log(isLandscape)

                if(isLandscape){
                    
                    var ratio = getRatio(width,height);

                    return resizeIt(300, 300/ratio, file);
                }
                else{
                    if(width == height){
                        return resizeIt(300, 300, file);
                    }
                    else{

                        var ratio = getRatio(height,width);

                        return resizeIt(300, 300/ratio, file);
                    }
                }
            }
        }
    

}

function getRatio(bigSide, smallSide){
    return bigSide/smallSide
}

function resizeIt(maxWidth, maxHeight,image){
    var result;
    Resizer.imageFileResizer(
        image,
        maxWidth, // width
        maxHeight, // height
        'JPEG',
        100,
        0,
        uri => {
            
            console.log(uri)
            console.log(image)
        },
        'blob'
      );

      
      
}


