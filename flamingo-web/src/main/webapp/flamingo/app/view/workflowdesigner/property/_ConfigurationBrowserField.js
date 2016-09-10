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
Ext.define('Flamingo.view.workflowdesigner.property._ConfigurationBrowserField', {
    extend: 'Ext.form.FieldContainer',
    alias: 'widget._configurationBrowserField',

    fieldLabel: message.msg('workflow.common.configbrowser'),
    disabled: false,
    defaults: {
        hideLabel: true
    },
    layout: 'hbox',

    initComponent: function () {
        var me = this;
        this.items = [
            {
                xtype: 'textfield',
                name: 'config',
                allowBlank: true,
                flex: 1
            },
            {
                xtype: 'button',
                text: message.msg('common.browse'),
                tooltip: message.msg('workflow.msg_configbrowser'),
                handler: function () {
                    var panel = me;
                    var popWindow = Ext.create('Ext.Window', {
                        title: message.msg('common.hdfs.browser'),
                        width: 800,
                        height: 400,
                        modal: true,
                        resizable: true,
                        constrain: true,
                        layout: 'fit',
                        items: {
                            xtype: 'hdfsBrowser'
                        },
                        buttonAlign: 'center',
                        buttons: [
                            {
                                text: message.msg('common.confirm'),
                                handler: function () {
                                    var grid = popWindow.query('#hdfsBrowserListGrid')[0];
                                    var columnGrid = panel.up().query('_keyValueGrid')[0];
                                    var clusterCombo = Ext.ComponentQuery.query('canvas #wd_cmb_cluster')[0];
                                    var textfield = panel.query('textfield')[0];

                                    var gridSelected = grid.getSelectionModel().getSelection();
                                    if (gridSelected.length != 0) {
                                        var metadataFile = gridSelected[0].data.id;

                                        // TODO FIX URL
                                        invokePostByMap('/rest/designer/loadConfig.do', {
                                                file: metadataFile,
                                                cluster: clusterCombo.getValue()
                                            },
                                            function (response) {
                                                var obj = Ext.decode(response.responseText);
                                                if (obj.success) {
                                                    textfield.setValue(metadataFile);
                                                    columnGrid.getStore().removeAll();
                                                    for (var i = 0; i < obj.total; i++) {
                                                        columnGrid.getStore().add(obj.list[i]);
                                                    }
                                                } else {
                                                    Ext.MessageBox.show({
                                                        title: message.msg('common.warn'),
                                                        message: message.msg('workflow.msg_not_load_config') + obj.error.message,
                                                        buttons: Ext.MessageBox.OK,
                                                        icon: Ext.MessageBox.ERROR
                                                    });
                                                }
                                            },
                                            function () {
                                                Ext.MessageBox.show({
                                                    title: message.msg('common.warn'),
                                                    message: message.msg('workflow.msg_not_load_config'),
                                                    buttons: Ext.MessageBox.OK,
                                                    icon: Ext.MessageBox.ERROR
                                                });

                                            }
                                        );

                                        popWindow.close();
                                    } else {
                                        Ext.MessageBox.show({
                                            title: message.msg('common.warn'),
                                            message: message.msg('workflow.msg_hadoop_config_ok'),
                                            buttons: Ext.MessageBox.OK,
                                            icon: Ext.MessageBox.ERROR
                                        });
                                    }
                                }
                            },
                            {
                                text: message.msg('common.cancel'),
                                handler: function () {
                                    popWindow.close();
                                }
                            }
                        ]
                    }).show();
                }
            }
        ];
        this.callParent(arguments);
    }
});