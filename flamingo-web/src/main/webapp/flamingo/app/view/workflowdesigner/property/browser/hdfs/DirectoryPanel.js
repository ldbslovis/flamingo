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
Ext.define('Flamingo.view.workflowdesigner.property.browser.hdfs.DirectoryPanel', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.hdfsDirectoryPanelForDesigner',

    store: Ext.create('Flamingo2.store.designer.property.browser.hdfs.DirectoryStore'),

    dockedItems: [
        {
            xtype: 'toolbar',
            items: [
                {
                    xtype: 'hidden',
                    itemId: 'lastPath',
                    allowBlank: true
                },
                '->',
                {
                    text: message.msg('common.refresh'),
                    iconCls: 'common-refresh',
                    itemId: 'refreshButton',
                    tooltip: message.msg('workflow.common.hdfsbrowser.refresh.tooltip')
                }
            ]
        }
    ]
});