/*
* This file is part of wxSmithAui plugin for Code::Blocks Studio
* Copyright (C) 2008-2009  César Fernández Domínguez
*
* wxSmithAui is free software; you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation; either version 3 of the License, or
* (at your option) any later version.
*
* wxSmithAui is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
* GNU General Public License for more details.
*
* You should have received a copy of the GNU General Public License
* along with wxSmithAui. If not, see <http://www.gnu.org/licenses/>.
*/

#ifndef WXSMITHAUITOOLBAR_H
#define WXSMITHAUITOOLBAR_H

#include <wx/wx.h>

#if wxCHECK_VERSION(2,8,9)

#include <wx/aui/auibar.h>

class wxSmithAuiToolBar : public wxAuiToolBar
{
    public:
        wxSmithAuiToolBar(wxWindow* parent,wxWindowID id = -1,const wxPoint& position = wxDefaultPosition,const wxSize& size = wxDefaultSize,long style = wxAUI_TB_DEFAULT_STYLE);
        virtual ~wxSmithAuiToolBar();

        /// \brief wxAuiToolBar::HitTest don't work properly
        int HitTest(const wxPoint& pt);
        void AddSpacer(int pixels,wxWindowID SpacerId);
        void AddStretchSpacer(int proportion,wxWindowID SpacerId);
    protected:
    private:
};

#endif // wxCHECK_VERSION(2,8,9)

#endif // WXSMITHAUITOOLBAR_H
