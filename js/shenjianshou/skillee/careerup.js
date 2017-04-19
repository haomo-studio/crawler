var configs = {
    domains: ["careercup.com"],
    scanUrls: ["https://www.careercup.com/page"],
    contentUrlRegexes: [/https:\/\/www\.careercup\.com\/question\?id\=\d+/],
    helperUrlRegexes: [/https:\/\/www\.careercup\.com\/page\?n=\d+/], //可留空
    fields: [
        {
            // 抽取项
            name: "titleA",
            alias: "主标题",
            selector: "//div[@id='mainpagebody']/h2/text()[1]",
            required: true //是否不能为空
        },
        {
            // 抽取项
            name: "titleB",
            alias: "副标题",
            selector: "//div[@id='mainpagebody']/h2/text()[2]"
        },
        {
            // 抽取项
            name: "question",
            alias: "题目详情",
            selector: "//*[@class='entry']//p", //默认使用XPath
            required: true //是否不能为空
        }
    ]
};

var crawler = new Crawler(configs);
crawler.start();