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

#ifndef WXSAUITOOLBAR_H
#define WXSAUITOOLBAR_H

#include <wxwidgets/wxscontainer.h>
#include <wx/aui/aui.h>

class wxsAuiToolBar : public wxsContainer
{
    public:
        int  m_GripperSize;

        wxsAuiToolBar(wxsItemResData* Data);
        virtual ~wxsAuiToolBar();

    protected:
    private:
        virtual void OnEnumContainerProperties(long Flags) {}
        virtual bool OnCanAddChild(wxsItem* Item,bool ShowMessage);
        virtual bool OnCanAddToParent(wxsParent* Parent,bool ShowMessage);
        virtual wxsPropertyContainer* OnBuildExtra();
        virtual wxString OnXmlGetExtraObjectClass();
        virtual wxObject* OnBuildPreview(wxWindow* Parent,long PreviewFlags);
        virtual void OnBuildCreatingCode();
        virtual bool OnMouseClick(wxWindow* Preview,int PosX,int PosY);
        virtual bool OnIsChildPreviewVisible(wxsItem* Child);
        virtual bool OnEnsureChildPreviewVisible(wxsItem* Child);

        void UpdateCurrentSelection();

        wxsItem* m_CurrentSelection;
        wxObject* m_LastPreview;        ///< \brief Current preview object
};

#endif // WXSAUINOTEBOOK_H
