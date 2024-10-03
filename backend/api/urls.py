from django.urls import path
from . import views

urlpatterns = [
    path("notes/", views.NoteListCreate.as_view(), name="note-list"),
    path("notes/delete/<int:pk>/", views.NoteDelete.as_view(), name="delete-note"),
    path("profile/", views.UserProfileRead.as_view(), name="profile-read"),
    path("profile/edit/", views.UserProfileUpdate.as_view(), name="profile-update"),
    path("createpost/", views.PostCreate.as_view(), name="create-post"),
    path("posts/", views.PostListView.as_view(), name="post-list"),
]