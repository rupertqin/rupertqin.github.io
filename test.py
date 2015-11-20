#!/usr/bin/python
# -*- coding:utf8 -*-

from mongoengine import Document, EmbeddedDocument
from mongoengine.fields import StringField,LongField,IntField,FloatField,ListField
from mongoengine.fields import EmbeddedDocumentField
from position_model import *

class GenderStats(EmbeddedDocument):
    """
    性别分布统计
    """
    gender = IntField(help_text="性别")
    num = LongField(default=0, help_text="职位数量")
    ratio = FloatField(help_text="占比")
    over_ratio = FloatField(help_text="比其他职位高/低x%")


class DiplomaStats(EmbeddedDocument):
    """
    学历分布统计
    """
    diploma = IntField(help_text="学历")
    num = LongField(default=0, help_text="职位在该学历数量")
    ratio = FloatField(help_text="占比")


class JobStartEndStats(EmbeddedDocument):
    """
    最近5年入职离职周期统计
    """
    mon = StringField(help_text="统计月份:1~12")
    job_start_num = LongField(default=0, help_text="入职人数")
    job_end_num = LongField(default=0, help_text="离职人数")


class SalaryLayerStats(EmbeddedDocument):
    """
    薪酬5档分类统计
    """
    layer1_num = LongField(default=0, help_text="小于5K人数")
    layer1_ratio = FloatField(default=0, help_text="小于5K人数比例")
    layer2_num = LongField(default=0, help_text="大于等于5K且小于8K人数")
    layer2_ratio = FloatField(default=0, help_text="大于等于5K且小于8K人数比例")
    layer3_num = LongField(default=0, help_text="大于等于8K且小于12K人数")
    layer3_ratio = FloatField(default=0, help_text="大于等于8K且小于12K人数比例")
    layer4_num = LongField(default=0, help_text="大于等于12K且小于15K人数")
    layer4_ratio = FloatField(default=0, help_text="大于等于12K且小于15K人数比例")
    layer5_num = LongField(default=0, help_text="大于15K人数")
    layer5_ratio = FloatField(default=0, help_text="大于15K人数比例")


class SalaryFactorStats(EmbeddedDocument):
    """
    薪酬指数统计
    """
    salary_factor = FloatField(default=0, help_text="薪酬指数")


class SalaryGrowStats(EmbeddedDocument):
    """
    毕业薪酬增长统计
    """
    grad_year = IntField(help_text="毕业第几年")
    salary = FloatField(help_text="薪酬")
    grow = FloatField(help_text="薪酬相对于上一年的增长")


class SalaryLevelStats(EmbeddedDocument):
    """
    职位薪酬水平统计
    """
    position_salary = FloatField(help_text="职位在城市薪酬值")
    position_salary_than_other_position = FloatField(help_text="比同城市其他职位薪酬值高/低占比")


class SalaryCityCompetitive(EmbeddedDocument):
    """
    城市薪资竞争力统计
    """
    position_salary = FloatField(help_text="职位在城市薪酬值")
    position_salary_than_other_city = FloatField(help_text="比其他城市同职位薪酬值高/低占比") 
    

class JobContinuityStats(EmbeddedDocument):
    """
    职业延续性统计
    """
    continue_num = LongField(help_text="换工作不换职能的人数")
    continue_ratio = FloatField(help_text="换工作不换职能的人数在本职位比例")
    continue_than_other_ratio = FloatField(help_text="换工作不换职能的人数比x%其他职位高")


class JobSourceStats(EmbeddedDocument):
    """
    来源职位统计
    """
    source_position = StringField(help_text="来源职位")
    source_position_num = LongField(help_text="来源职位人数")
    source_position_ratio = FloatField(help_text="来源职位人数占来源比")


class JobForwardStats(EmbeddedDocument):
    """
    去向职位统计
    """
    forward_position = StringField(help_text="来源职位")
    forward_position_num = LongField(help_text="来源职位人数")
    forward_position_ratio = FloatField(help_text="来源职位人数占来源比")


class JobNextIncMost(EmbeddedDocument):
    """
    去向公司前20名
    """
    next_inc = StringField(help_text="去向公司")
    next_inc_rank = IntField(help_text="去向公司排名")


class JobDurationStats(EmbeddedDocument):
    """
    平均在职时长
    """
    position_duration = FloatField(help_text="该职位平均在职时长")
    position_industry_average = FloatField(help_text="同行业平均在职时长")
    position_over_ratio = FloatField(help_text="在职时长比x%其他职位高")


class PositionIndicatorStatsByCity(Document):
    """
    职位库指标统计(分城市,不分行业)
    """
    stat_date = StringField(help_text="统计日期")
    position_id = StringField(help_text="职位ID")
    position_role = StringField(help_text="职位对应职能")
    position_city = StringField(help_text="职位所在城市")
    position_sample = LongField(help_text="该职位统计样本数")
    salary_layer_stats = ListField(EmbeddedDocumentField(SalaryLayerStats, help_text="薪酬5档分类"))
    salary_factor_stats = ListField(EmbeddedDocumentField(SalaryFactorStats, help_text="薪酬指数统计"))
    salary_grow_stats = ListField(EmbeddedDocumentField(SalaryGrowStats, help_text="毕业薪酬增长统计"))
    salary_level_stats = ListField(EmbeddedDocumentField(SalaryLevelStats, help_text="职位薪酬水平统计"))
    salary_city_competitive = ListField(EmbeddedDocumentField(SalaryCityCompetitive, help_text="城市薪酬竞争力统计"))

    meta = { 
        "db_alias":"position_v5",
        "collection":"position_indicators_by_city",
        "strict":False,
        "indexes":[
            {   
                "fields":("position_id","position_city"),
                "unique":False
            }   
        ]   
    }


class PositionIndicatorStatsNoCity(Document):
    """
    职位库指标统计(不分城市,不分行业)
    """
    stat_date = StringField(help_text="统计日期")
    position_id = StringField(help_text="职位ID")
    position_role = StringField(help_text="职位对应职能")
    position_sample = LongField(help_text="该职位统计样本数")
    salary_factor_stats = FloatField(default=0, help_text="该职位全国薪酬指数")
    avg_diploma_ratio = FloatField(help_text="该职位平均学历百分比(本科以上学历占比)")
    avg_diploma_over_ratio = FloatField(help_text="该职位平均学历高于x%职位")
    gender_stats = ListField(EmbeddedDocumentField(GenderStats, help_text="性别统计"))
    diploma_stats = ListField(EmbeddedDocumentField(DiplomaStats, help_text="学历统计"))
    job_startend_stats = ListField(EmbeddedDocumentField(JobStartEndStats, help_text="最近5年入职离职周期"))
    job_continuity_stats = ListField(EmbeddedDocumentField(JobContinuityStats, help_text="职业延续性统计"))
    job_source_stats = ListField(EmbeddedDocumentField(JobSourceStats, help_text="来源职位统计"))
    job_forward_stats = ListField(EmbeddedDocumentField(JobForwardStats, help_text="去向职位统计"))
    job_next_inc_most = ListField(EmbeddedDocumentField(JobNextIncMost, help_text="去向公司前20"))
    job_duration_stats = ListField(EmbeddedDocumentField(JobDurationStats, help_text="职位平均在职时长"))

    meta = { 
        "db_alias":"position_v5",
        "collection":"position_indicators_no_city",
        "strict":False,
        "indexes":[
            {   
                "fields":("position_id"),
                "unique":False
            }   
        ]   
    }


class PositionCityList(Document):
    """
    职位库指标统计-职位的城市列表
    """
    position_id = StringField(help_text="职位ID")
    position_city = ListField(StringField(), help_text="职位所在城市列表")

    meta = { 
        "db_alias":"position_v5",
        "collection":"position_city_list",
        "strict":False,
        "indexes":[
            {   
                "fields":("position_id"),
                "unique":True
            }   
        ]   
    }
