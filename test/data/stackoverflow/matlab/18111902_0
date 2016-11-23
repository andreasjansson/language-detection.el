function x_Callback(hObject, eventdata, handles)
% hObject    handle to x (see GCBO)
% eventdata  reserved - to be defined in a future version of MATLAB
% handles    structure with handles and user data (see GUIDATA)
user_entry_X = str2double(get(hObject,'string'));
if isnan(user_entry_X)
 errordlg('You must enter a numeric value','Bad Input','modal')
 uicontrol(hObject)
return
end