package com.htmlppt.rest.business;

import org.apache.poi.xslf.usermodel.XMLSlideShow;
import org.apache.poi.xslf.usermodel.XSLFShape;
import org.apache.poi.xslf.usermodel.XSLFSlide;
import org.apache.poi.xslf.usermodel.XSLFTextShape;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Service
public class PortfolioBusiness {

    public Map<String, String> upload(MultipartFile file) throws IOException {

        Map<String, String> response = new HashMap<>();
        int count = 0;
        String key ="";
        XMLSlideShow ppt = new XMLSlideShow(file.getInputStream());

        for (XSLFSlide slide: ppt.getSlides()) {
            System.out.println("Starting slide...");
            XSLFShape[] shapes = slide.getShapes().toArray(new XSLFShape[0]);
            for (XSLFShape shape: shapes) {
                if (shape instanceof XSLFTextShape) {

                    XSLFTextShape textShape = (XSLFTextShape)shape;
                    String text = textShape.getText();
                    System.out.println("Text: " + text);
                    if(count%2 ==0){
                        key = text;
                    } else {
                        response.put(key, text);
                    }
                    count++;
                }
            }
        }

        return response;
    }
}
