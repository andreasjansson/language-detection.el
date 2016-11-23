/*
 * This file is part of the Code::Blocks IDE and licensed under the GNU General Public License, version 3
 * http://www.gnu.org/licenses/gpl-3.0.html
 */

#ifndef CCOPTIONSPRJDLG_H
#define CCOPTIONSPRJDLG_H

#include <wx/intl.h>
#include "configurationpanel.h"
#include <settings.h>
#include "nativeparser.h"
#include "parser/parser.h"

class cbProject;

class CCOptionsProjectDlg : public cbConfigurationPanel
{
    public:
        CCOptionsProjectDlg(wxWindow* parent, cbProject* project, NativeParser* np);
        virtual ~CCOptionsProjectDlg();

        virtual wxString GetTitle() const          { return _("C/C++ parser options"); }
        virtual wxString GetBitmapBaseName() const { return _T("generic-plugin"); }
        virtual void OnApply();
        virtual void OnCancel(){}
    protected:
        void OnAdd(wxCommandEvent& event);
        void OnEdit(wxCommandEvent& event);
        void OnDelete(wxCommandEvent& event);
        void OnUpdateUI(wxUpdateUIEvent& event);
    private:
        cbProject* m_pProject;
        NativeParser* m_pNativeParser;
        Parser* m_pParser;
        wxArrayString m_OldPaths;
        DECLARE_EVENT_TABLE()
};

#endif // CCOPTIONSPRJDLG_H
