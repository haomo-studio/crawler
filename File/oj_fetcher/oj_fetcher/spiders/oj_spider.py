from scrapy import Request
from scrapy import Spider

from oj_fetcher.items import OjItem


class OJSpider(Spider):
    name = 'oj'

    def start_requests(self):
        for i in range(0, 3600, 50):
            url = 'http://www.spoj.com/problems/classical/sort=0,start=%s' % i
            yield Request(
                url=url
            )

    def parse(self, response):
        for i in response.xpath('//td[@align="left"]/a/@href').extract():
            url = 'http://www.spoj.com/' + i + '/'
            yield Request(
                url=url,
                callback=self.parse_detail
            )

    def parse_detail(self, response):
        url = response.url
        title = response.css('#problem-name::text').extract_first()

        content_list = []
        example_list = []
        flag = 0
        for idx in response.xpath('//*[@id="problem-body"]//text()').extract():
            if idx in ['Example', 'Sample']:
                flag = 1
            if flag == 0:
                content_list.append(idx)
            else:
                example_list.append(idx)

        content = ''.join(content_list)
        example = ''.join(example_list)

        oj_item = OjItem()
        oj_item['url'] = url
        oj_item['title'] = title
        oj_item['content'] = content
        oj_item['example'] = example
        yield oj_item
