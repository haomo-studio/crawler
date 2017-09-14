/**
 * 爬虫
 * http://www.spoj.com/problems/classical/
 * @type {Object}
 */
var configs = {
    domains: ["spoj.com"],
    scanUrls: ["http://www.spoj.com/problems/classical/"],
    contentUrlRegexes: [/http:\/\/.*/],//内容页url正则
    helperUrlRegexes: [/http:\/\/.*/], //列表页url正则 可留空
    fields: [
        {
            // 抽取项
            name: "title",
            selector: "//h2[contains(@id,'problem-name')]", //默认使用XPath
            required: true //是否不能为空
        },
        {
            // 抽取项
            name: "content",
            selector: "//div[contains(@id,'problem-body')]"
        }
    ]
};

var crawler = new Crawler(configs);
crawler.start();