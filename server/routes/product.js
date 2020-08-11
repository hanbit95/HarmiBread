const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Product } = require('../models/Product');

//=================================
//             Product
//=================================


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function(req, file, cb) {  //파일이름 저장하는 방법
      cb(null, `${Date.now()}_${file.originalname}`)
    }
})
   
var upload = multer({ storage: storage }).single("file")

router.post('/image', (req, res) => {

    //가져온 이미지 저장을 해주면 된다.
    upload(req, res, err => {
        if(err) {
            return req.json({ success: false, err})
        }
        return res.json({ success: true, filePath: res.req.file.path, fileName: res.req.file.filename
    })
    })
})

router.post('/', (req, res) => {
    // 받아온 정보를 DB에 넣어준다.
   const product = new Product(req.body)

   product.save((err) => {
       if(err) return res.status(400).json({ success: false, err })
       return res.status(200).json({ success:true })
   })

})

router.post('/products', (req, res) => {
    // product collection 에 들어있는 모든 상품 정보들을 가져오기. 
   
    let limit = req.body.limit ? parseInt(req.body.limit) : 20;  //parseInt는 숫자일 경우 스트링으로 바꿔주는 역할을 한다.
    let skip = req.body.skip ? parseInt(req.body.skip) : 0; //? 표시는 있다면? 이라는 뜻 없으면 : 숫자 <= 여기로 간다.
    let term = req.body.searchTerm

    let findArgs = {};

    for(let key in req.body.filters) {
        
        if(req.body.filters[key].length > 0) {

            if (key === "price") {
                findArgs[key] = {
                    //greater than equal 
                    $gte: req.body.filters[key][0],
                    //less than equal
                    $lte: req.body.filters[key][1]
                }

            } else {           
                findArgs[key] = req.body.filters[key];
            }
        }
    }

    console.log('findArgs', findArgs)

    if(term){
        Product.find(findArgs) 
        .find({ $text: {$search: term}})
        .populate("writer")
        .skip(skip)
        .limit(limit)
        .exec((err, productInfo) => {
        if(err) return res.status(400).json({ success: false, err })
            return res.status(200).json({ 
                success: true, productInfo,
                postSize: productInfo.length
        })
    })

    }else {  
        Product.find(findArgs) 
        .populate("writer")
        .skip(skip)
        .limit(limit)
        .exec((err, productInfo) => {
            if(err) return res.status(400).json({ success: false, err })
            return res.status(200).json({ 
                success: true, productInfo,
                postSize: productInfo.length
        })
    })


    }
})

router.get('/products_by_id', (req, res) => {
    // productId 를 이용해서 DB 에서 productId 와 같은 상품의 정보를 가져온다. 

    let type = req.query.type
    let productId = req.query.id 

    Product.find({ _id: productId })
        .populate('writer')
        .exec((err, product) => {
            if (err) return res.status(400).send(err)
            return res.status(200).send({ success: true, product })
        })

})





module.exports = router;
