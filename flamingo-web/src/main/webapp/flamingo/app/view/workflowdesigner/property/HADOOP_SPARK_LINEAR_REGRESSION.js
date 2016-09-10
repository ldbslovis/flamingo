/*
 * Copyright (C) 2011 Flamingo Project (http://www.cloudine.io).
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
Ext.define('Flamingo.view.workflowdesigner.property.HADOOP_SPARK_LINEAR_REGRESSION', {
    extend: 'Flamingo.view.workflowdesigner.property._NODE_HADOOP',
    alias: 'widget.HADOOP_SPARK_LINEAR_REGRESSION',

    requires: [
        'Flamingo.view.workflowdesigner.property._JarBrowserField',
        'Flamingo.view.workflowdesigner.property._BrowserField',
        'Flamingo.view.workflowdesigner.property._InputGrid',
        'Flamingo.view.workflowdesigner.property._JarGrid',
        'Flamingo.view.workflowdesigner.property._KeyValueGrid'
    ],

    width: 600,
    height: 360,

    items: [
        {
            title: 'Spark',
            xtype: 'form',
            border: false,
            autoScroll: true,
            defaults: {
                labelWidth: 120
            },
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'displayfield',
                    value: message.msg('workflow.he.spark.display.spark'),
                    height: 40
                },
                {
                    xtype: '_jarBrowserField',
                    name: 'jar',
                    fieldLabel: message.msg('workflow.he.spark.jar'),
                    allowBlank: false,
                    listeners: {
                        beforerender: function (comp, eOpts) {
                            var path = '/samples/flamingo2-spark-hadoop2-2.1.0-SNAPSHOT.jar';
                            var textfield = Ext.ComponentQuery.query('_jarBrowserField > textfield')[0];
                            textfield.setValue(path);
                        }
                    }
                },
                {
                    xtype: 'textfield',
                    name: 'driver',
                    fieldLabel: message.msg('workflow.he.spark.driver'),
                    value: 'org.opencloudengine.flamingo2.spark.mlib.linear.regression.SparkLinearRegression',
                    allowBlank: false
                },
                {
                    xtype: 'checkboxfield',
                    name: 'yarn',
                    itemId: 'yarn',
                    checked: true,
                    inputValue: "0",
                    uncheckedValue: "0",
                    value: 0,
                    fieldLabel: message.msg('workflow.he.spark.yarn'),
                    boxLabel: message.msg('workflow.common.use'),
                    listeners: {
                        beforerender: function (comp, eOpts) {
                            comp.setValue(false);
                        }
                    },
                    handler: function (check) {
                        var sparkMasterUrl = check.nextSibling('textfield');

                        if (check.checked) {
                            sparkMasterUrl.setValue('yarn-cluster');
                            // sparkMasterUrl.setValue('');
                        } else {
                            // 처음 로딩한 url 값이 호스트네임 패턴일 경우 한 번더 체크
                            if (sparkMasterUrl.lastValue != config['spark.master.url']
                                && sparkMasterUrl.lastValue != sparkMasterUrl.initialValue) {
                                sparkMasterUrl.setValue(sparkMasterUrl.lastValue);
                            } else {
                                sparkMasterUrl.setValue(config['spark.master.url']);
                            }
                        }
                    }
                },
                {
                    xtype: 'textfield',
                    name: 'sparkMasterUrl',
                    itemId: 'sparkMasterUrl',
                    fieldLabel: message.msg('workflow.he.spark.masterurl'),
                    emptyText: 'Standalone Mode',
                    value: 'local[1]',
                    allowBlank: false
                },
                {
                    xtype: 'textfield',
                    name: 'totalExecutorCores',
                    fieldLabel: message.msg('workflow.he.spark.totalexecores'),
                    emptyText: 'Standalone Mode (--total-executor-cores)',
                    value : 2,
                    allowBlank: true
                },
                {
                    xtype: 'textfield',
                    name: 'executorMemory',
                    fieldLabel: message.msg('workflow.he.spark.exememory'),
                    emptyText: 'YARN & Standalone Mode (--executor-memory)',
                    value : '2g',
                    allowBlank: true
                },
                {
                    xtype: 'textfield',
                    name: 'numExecutors',
                    fieldLabel: message.msg('workflow.he.spark.exe'),
                    emptyText: 'YARN & Standalone Mode (--num-executors)',
                    value: 2,
                    allowBlank: true
                },
                {
                    xtype: 'textfield',
                    name: 'driverMemory',
                    fieldLabel: message.msg('workflow.he.spark.drivermemory'),
                    emptyText: 'YARN Mode (--driver-memory)',
                    value: '2g',
                    allowBlank: true
                },
                {
                    xtype: 'textfield',
                    name: 'queue',
                    fieldLabel: message.msg('workflow.he.spark.queue'),
                    emptyText: 'YARN Mode (--queue)',
                    value: 'default',
                    allowBlank: true
                },
                {
                    xtype: 'textfield',
                    name: 'executorCores',
                    fieldLabel: message.msg('workflow.he.spark.execores'),
                    emptyText: 'YARN Mode (--executor-cores)',
                    value: 2,
                    allowBlank: true
                }
            ],
            listeners: {
/*                beforerender: function (comp, eOpts) {
                    var path = '/samples/shi/flamingo2-spark-hadoop2-2.1.0-SNAPSHOT.jar';
                    var textfield = Ext.ComponentQuery.query('_jarBrowserField > textfield')[0];
                    textfield.setValue(path);
                }*/
            }
        },
        {
            title: 'UDF 파라미터',
            xtype: 'form',
            border: false,
            autoScroll: true,
            defaults: {
                labelWidth: 120
            },
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'textfield',
                    name: 'slr',
                    value: 'slr',
                    hidden: true
                },
                {
                    xtype: 'displayfield',
                    value: 'UDF 파라미터 설정을 통해서 예측모형을 정의한 후 예측값을 구할 수 있습니다. 예측값을 통해 최초납품요청일 대비 최종 예측 입고일을 확인할 수 있습니다.',
                    height: 40
                },
                {
                    xtype: 'textfield',
                    name: 'y',
                    emptyText: '2016-06-10',
                    fieldLabel: '납기지연일',
                    tooltip: 'y = 입고일 - 최초납품요청일 + 1',
                    allowBlank: false
                },
                {
                    xtype: 'textfield',
                    name: 'x1',
                    emptyText: '1',
                    fieldLabel: '작업준비기간',
                    tooltip: 'x1 = Fit-Up일 W/O + 1',
                    vtype: 'numeric',
                    allowBlank: false
                },
                {
                    xtype: 'textfield',
                    name: 'x2',
                    emptyText: '1',
                    fieldLabel: '제작기간',
                    tooltip: 'x2 = 제작일 - Fit-Up일 + 1',
                    vtype: 'numeric',
                    allowBlank: false
                },
                {
                    xtype: 'textfield',
                    name: 'x3',
                    emptyText: '1',
                    fieldLabel: '검사대기기간',
                    tooltip: 'x3 = NDE일 - 제작일 + 1',
                    vtype: 'numeric',
                    allowBlank: false
                },
                {
                    xtype: 'textfield',
                    name: 'x4',
                    emptyText: '1',
                    fieldLabel: '물류대기기간',
                    tooltip: 'x4 = 제작배재일 - NDE일 + 1',
                    vtype: 'numeric',
                    allowBlank: false
                },
                {
                    xtype: 'textfield',
                    name: 'x5',
                    emptyText: '1',
                    fieldLabel: '운송대기기간',
                    tooltip: 'x5 = 제작반출일 - 제작배재일 + 1',
                    vtype: 'numeric',
                    allowBlank: false
                },
                {
                    xtype: 'textfield',
                    name: 'dia',
                    emptyText: '1',
                    fieldLabel: '파이프 직경',
                    tooltip: 'dia = 파이프 직경',
                    vtype: 'numeric',
                    allowBlank: false
                },
                {
                    xtype: 'textfield',
                    name: 'length',
                    emptyText: '1',
                    fieldLabel: '파이프 길이',
                    tooltip: 'length = 파이프 길이',
                    vtype: 'numeric',
                    allowBlank: false
                },
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: '제작협력사',
                    tooltip: 'b0 ~ b6 = 제작협력사',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'combo',
                                    name: 'company',
                                    value: '\'\\t\'',
                                    flex: 1,
                                    forceSelection: true,
                                    multiSelect: false,
                                    editable: false,
                                    readOnly: this.readOnly,
                                    displayField: 'name',
                                    valueField: 'value',
                                    mode: 'local',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    tpl: '<tpl for="."><div class="x-boundlist-item" data-qtip="{description}">{name}</div></tpl>',
                                    store: Ext.create('Ext.data.Store', {
                                        fields: ['name', 'value', 'description'],
                                        data: [
                                            {
                                                name: '피앤앨',
                                                value: '피앤앨',
                                                description: 'Company Key : b1'
                                            },
                                            {
                                                name: '건일산업',
                                                value: '건일산업',
                                                description: 'Company Key : b2'
                                            },
                                            {
                                                name: '부흥',
                                                value: '부흥',
                                                description: 'Company Key : b3'
                                            },
                                            {
                                                name: '성일',
                                                value: '성일',
                                                description: 'Company Key : b4'
                                            },
                                            {
                                                name: '승민',
                                                value: '승민',
                                                description: 'Company Key : b5'
                                            },
                                            {
                                                name: '(주)성광테크',
                                                value: '(주)성광테크',
                                                description: 'Company Key : b6'
                                            }
                                        ]
                                    }),
                                    listeners: {
                                        change: function (combo, newValue, oldValue, eOpts) {
                                            // 콤보 값에 따라 관련 textfield 를 enable | disable 처리한다.
                                            var customValueField = combo.nextSibling('textfield');
                                            /*                                            if (newValue === 'CUSTOM') {
                                             customValueField.enable();
                                             customValueField.isValid();
                                             } else {*/
                                            customValueField.disable();
                                            if (newValue) {
                                                customValueField.setValue(newValue);
                                            } else {
                                                customValueField.setValue('::');
                                            }
                                            // }
                                        }
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'delimiterValue',
                                    vtype: 'exceptcommaspace',
                                    flex: 1,
                                    disabled: true,
                                    readOnly: this.readOnly,
                                    allowBlank: false
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: '대표문제점',
                    tooltip: 'b7 ~ b12 = 대표문제점',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'combo',
                                    name: 'problem',
                                    value: '\'\\t\'',
                                    flex: 1,
                                    forceSelection: true,
                                    multiSelect: false,
                                    editable: false,
                                    readOnly: this.readOnly,
                                    displayField: 'name',
                                    valueField: 'value',
                                    mode: 'local',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    tpl: '<tpl for="."><div class="x-boundlist-item" data-qtip="{description}">{name}</div></tpl>',
                                    store: Ext.create('Ext.data.Store', {
                                        fields: ['name', 'value', 'description'],
                                        data: [
                                            {
                                                name: 'LT부족',
                                                value: 'LT부족',
                                                description: 'Problem Key : b7'
                                            },
                                            {
                                                name: '설계.REV.',
                                                value: '설계.REV.',
                                                description: 'Problem Key : b8'
                                            },
                                            {
                                                name: '설계문제',
                                                value: '설계문제',
                                                description: 'Problem Key : b9'
                                            },
                                            {
                                                name: '설계보류',
                                                value: '설계보류',
                                                description: 'Problem Key : b10'
                                            },
                                            {
                                                name: '자재문제',
                                                value: '자재문제',
                                                description: 'Problem Key : b11'
                                            },
                                            {
                                                name: '제작지연',
                                                value: '제작지연',
                                                description: 'Problem Key : b12'
                                            },
                                            {
                                                name: '기타',
                                                value: '기타',
                                                description: 'Problem Key : b13'
                                            }
                                        ]
                                    }),
                                    listeners: {
                                        change: function (combo, newValue, oldValue, eOpts) {
                                            // 콤보 값에 따라 관련 textfield 를 enable | disable 처리한다.
                                            var customValueField = combo.nextSibling('textfield');
                                            /*                                            if (newValue === 'CUSTOM') {
                                             customValueField.enable();
                                             customValueField.isValid();
                                             } else {*/
                                            customValueField.disable();
                                            if (newValue) {
                                                customValueField.setValue(newValue);
                                            } else {
                                                customValueField.setValue('::');
                                            }
                                            // }
                                        }
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'delimiterValue',
                                    vtype: 'exceptcommaspace',
                                    flex: 1,
                                    disabled: true,
                                    readOnly: this.readOnly,
                                    allowBlank: false
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            title: message.msg('workflow.common.dependency.jar'),
            xtype: 'form',
            border: false,
            autoScroll: true,
            defaults: {
                labelWidth: 100
            },
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'displayfield',
                    value: message.msg('workflow.he.spark.display.jar')
                },
                {
                    xtype: '_jarGrid',
                    title: message.msg('workflow.common.dependency.jar'),
                    name: 'dependencies',
                    flex: 1
                }
            ]
        },
        {
            title: message.msg('workflow.common.hadoop.conf'),
            xtype: 'form',
            border: false,
            autoScroll: true,
            defaults: {
                labelWidth: 100
            },
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'displayfield',
                    value: message.msg('workflow.he.spark.display.conf')
                },
                {
                    xtype: '_keyValueGrid',
                    flex: 1
                }
            ]
        },
        {
            title: message.msg('workflow.common.command'),
            xtype: 'form',
            border: false,
            autoScroll: true,
            defaults: {
                labelWidth: 100
            },
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'displayfield',
                    value: message.msg('workflow.he.spark.display.com')
                },
                {
                    xtype: '_commandlineGrid',
                    flex: 1
                }
            ]
        },
        {
            title: message.msg('common.references'),
            xtype: 'form',
            border: false,
            autoScroll: true,
            defaults: {
                labelWidth: 100
            },
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'displayfield',
                    height: 20,
                    value: '<a href="https://spark.apache.org/docs/latest/" target="_blank">Apache Spark</a>'
                },
                {
                    xtype: 'displayfield',
                    height: 20,
                    value: '<a href="https://spark.apache.org/examples.html" target="_blank">Spark Examples</a>'
                }
            ]
        }
    ],
    listeners: {
        afterrender: function () {
            var sparkMasterUrl = query('HADOOP_SPARK_LINEAR_REGRESSION #sparkMasterUrl');
            var yarn = query('HADOOP_SPARK_LINEAR_REGRESSION #yarn');

            yarn.setValue(0);
            /*
            if (sparkMasterUrl.lastValue == sparkMasterUrl.initialValue) {
                yarn.setValue(1);
            } else {
                sparkMasterUrl.setValue(sparkMasterUrl.lastValue);
                yarn.setValue(0);
            }*/
        }
    }
});