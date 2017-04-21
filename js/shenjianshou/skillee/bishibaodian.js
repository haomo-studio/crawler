var configs = {
    domains: ["bishibaodian.com"],
    scanUrls: ["http://www.bishibaodian.com/writtenCircle/findlightquestionlist?id=36c2067f-57f2-48b9-a22f-ddb838eb00fb&num=0","http://www.bishibaodian.com/writtenCircle/findlightquestionlist?id=07e2441f-75fd-45be-83bd-c56f8747747a&num=0","http://www.bishibaodian.com/writtenCircle/findlightquestionlist?id=445da698-1ed3-4fe0-8414-161bf4d0e4d6&num=0","http://www.bishibaodian.com/writtenCircle/findlightquestionlist?id=8056dc97-0cef-43fe-9925-1c21f8aa0bb0&num=0","http://www.bishibaodian.com/writtenCircle/findlightquestionlist?id=a15d57ea-cbb7-4e1c-8e8d-1f628b4135af&num=0","http://www.bishibaodian.com/writtenCircle/findlightquestionlist?id=a787ab46-08ba-4d87-a828-1ced2faaa1fe&num=0","http://www.bishibaodian.com/writtenCircle/findlightquestionlist?id=afc4ebc8-e9e3-43f9-a433-0617c98d33b6&num=0","http://www.bishibaodian.com/writtenCircle/findlightquestionlist?id=8adca41b-778a-40bb-92ec-56619a4eb2f4&num=0"],
    contentUrlRegexes: [/http:\/\/www\.bishibaodian\.com\/\/writtenCircle\/question_info\?info=\w+-\w+-\w+-\w+-\w+&ids=\w+-\w+-\w+-\w+-\w+/],
    helperUrlRegexes: [/http:\/\/www\.bishibaodian\.com\/writtenCircle\/lightquestionByid\?id=\w+-\w+-\w+-\w+-\w+&title_name=(\w+\+\w+|C%2B%2B|C%23|\w+)/], //可留空
    fields: [
        {
            // 抽取项
            name: "question",
            selector: "//*[@id='neirong']//*[contains(@class,'so_que_title')]", //默认使用XPath
            required: true //是否不能为空
        },
        {
            // 抽取项
            name: "content",
            selector: "//*[@id='neirong']//*[contains(@class,'xuanxiang')]"
        }
    ]
};

var crawler = new Crawler(configs);
crawler.start();