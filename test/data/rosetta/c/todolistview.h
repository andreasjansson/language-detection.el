/*
 * This file is part of the Code::Blocks IDE and licensed under the GNU General Public License, version 3
 * http://www.gnu.org/licenses/gpl-3.0.html
 */

#ifndef TODOLISTVIEW_H
#define TODOLISTVIEW_H

#include <wx/string.h>
#include "loggers.h"
#include <vector>
#include <map>
using namespace std;

class cbEditor;
class wxArrayString;
class wxCommandEvent;
class wxListEvent;
class wxComboBox;
class wxButton;
class wxPanel;

struct ToDoItem
{
    wxString type;
    wxString text;
    wxString user;
    wxString filename;
    wxString lineStr;
    wxString priorityStr;
    int line;
    int priority;
};

typedef map<wxString,vector<ToDoItem> > TodoItemsMap;

WX_DECLARE_OBJARRAY(ToDoItem, ToDoItems);

class ToDoListView : public ListCtrlLogger, public wxEvtHandler
{
    public:
        ToDoListView(const wxArrayString& titles, const wxArrayInt& widths, const wxArrayString& types);
        ~ToDoListView();
        virtual wxWindow* CreateControl(wxWindow* parent);

        void Parse();
        void ParseCurrent(bool forced);
        wxWindow* GetWindow(){ return m_pPanel; }

    private:
        void LoadUsers();
        void FillList();
        void SortList();
        void FillListControl();
        void ParseEditor(cbEditor* pEditor);
        void ParseFile(const wxString& filename);
        void ParseBuffer(const wxString& buffer, const wxString& filename);
        int CalculateLineNumber(const wxString& buffer, int upTo);
        void FocusEntry(size_t index);

        void OnComboChange(wxCommandEvent& event);
        void OnListItemSelected(wxCommandEvent& event);
        void OnButtonRefresh(wxCommandEvent& event);
        void OnDoubleClick( wxCommandEvent& event );
        void OnColClick( wxListEvent& event );

        wxWindow* m_pPanel;
        TodoItemsMap m_ItemsMap;
        ToDoItems m_Items;
        wxComboBox* m_pSource;
        wxComboBox* m_pUser;
        wxButton* m_pRefresh;
        const wxArrayString& m_Types;
        wxString m_LastFile;
        bool m_Ignore;
        bool m_SortAscending;
        int m_SortColumn;

        DECLARE_EVENT_TABLE()
};

#endif // TODOLISTVIEW_H

