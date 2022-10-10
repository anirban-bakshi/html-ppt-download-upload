package com.htmlppt.rest.controller;

import com.htmlppt.rest.business.PortfolioBusiness;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@RestController
public class PptController {

    @Autowired
    PortfolioBusiness portfolioBusiness;

    @RequestMapping(value="/upload", method = RequestMethod.POST)
    public ResponseEntity<Map> upload(@RequestParam("file") MultipartFile file) throws IOException {

        Map<String, String> responseMap = portfolioBusiness.upload(file);
        return new ResponseEntity<Map>(responseMap, HttpStatus.OK);
    }
}
