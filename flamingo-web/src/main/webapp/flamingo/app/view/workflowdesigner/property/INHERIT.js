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

/**
 * Apache Hive Property View
 *
 * @class
 * @extends Flamingo.view.workflowdesigner.property._NODE_HADOOP
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
Ext.define('Flamingo.view.workflowdesigner.property.INHERIT', {
    extend: 'Flamingo.view.workflowdesigner.property._NODE_HADOOP',
    alias: 'widget.INHERIT',

    requires: [
        'Flamingo.view.workflowdesigner.property._ConfigurationBrowserField',
        'Flamingo.view.workflowdesigner.property._BrowserField',
        'Flamingo.view.workflowdesigner.property._ColumnGrid_Prev',
        'Flamingo.view.workflowdesigner.property._ColumnGrid',
        'Flamingo.view.workflowdesigner.property._NameValueGrid',
        'Flamingo.view.workflowdesigner.property._KeyValueGrid',
        'Flamingo.view.workflowdesigner.property._HiveBrowser'
    ],

    width: 600,
    height: 400,

    items: [
        {
            title: message.msg('workflow.common.inherit.title'),
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
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: message.msg('common.value'),
                            flex: 1,
                            name: 'value'
                        },
                        {
                            xtype: 'checkbox',
                            fieldLabel: message.msg('common.inherit'),
                            labelWidth: 30,
                            name: 'value_INHERIT'
                        }
                    ]
                }
            ]
        }
    ]
});