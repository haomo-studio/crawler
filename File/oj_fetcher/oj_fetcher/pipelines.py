# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: http://doc.scrapy.org/en/latest/topics/item-pipeline.html
from oj_fetcher.database.oj_problem import OjProblem


class OjFetcherPipeline(object):
    def __init__(self):
        self._oj_problem = OjProblem()

    def process_item(self, item, spider):
        self._oj_problem.insert(item)
